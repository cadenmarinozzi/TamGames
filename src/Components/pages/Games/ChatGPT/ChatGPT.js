import {
	faPaperPlane,
	faUser,
	faUserPlus,
	faImage,
	faDownload,
	faComment,
	faExclamationCircle,
	faQuestionCircle,
	faInfoCircle,
	faMultiply,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import ChatGPTIcon from 'assets/images/chatGPT.png';
import {
	promptChatGPT,
	generateDalleImage,
	addImagePrice,
	getImagePriceUsage,
	addChatPrice,
	getChatPriceUsage,
	getGitHubFollowers,
	gitHubOAuth,
	getUserGitHubFollowing,
} from 'modules/web';
import { Component, createRef } from 'react';
import MarkdownIt from 'markdown-it';
import mdKatex from 'markdown-it-katex';
import mdHighlight from 'markdown-it-highlightjs';
import hljs from 'highlight.js';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import './ChatGPT.scss';
import 'highlight.js/styles/atom-one-dark.css';
import { downloadImage } from 'modules/utils';
import { getCookie } from 'modules/cookies';
import { getNTokens } from 'modules/utils';
import Toggle from 'Components/shared/Toggle';

class ChatGPT extends Component {
	constructor() {
		super();

		this.state = {
			history: [],
			message: '',
			imagePriceUsage: 0,
			chatPriceUsage: 0,
			loading: false,
			usageOpen: false,
			welcomeMessage: true,
			chatQuotaMessage: false,
			imageQuotaMessage: false,
			githubFollowMessage: true,
			maxImagePrice: 0.2,
			maxChatPrice: 0.2,
		};

		this.historyRef = createRef();
		this.imageUsageBarUsedRef = createRef();
		this.chatUsageBarUsedRef = createRef();
	}

	openUsage() {
		this.setState({
			usageOpen: true,
		});
	}

	closeUsage() {
		this.setState({
			usageOpen: false,
		});
	}

	toggleUsage() {
		this.setState({
			usageOpen: !this.state.usageOpen,
		});
	}

	async generateDalleImage() {
		const { message } = this.state;

		if (!message) {
			return;
		}

		if (this.state.imagePriceUsage >= this.state.maxImagePrice) {
			return;
		}

		this.setState({
			loading: true,
			imagePriceUsage: this.state.imagePriceUsage + 0.02,
		});

		addImagePrice({
			email: getCookie('email'),
		});

		if (this.imageUsageBarUsedRef?.current) {
			this.imageUsageBarUsedRef.current.style.width = `${Math.min(
				((this.state.imagePriceUsage + 0.02) /
					this.state.maxImagePrice) *
					100,
				100
			)}%`;
		}

		const imageArray = await generateDalleImage(message);

		const time = new Date().toLocaleTimeString();

		this.setState({
			history: [...this.state.history, [message, imageArray, time, true]],
			loading: false,
			needscroll: true,
		});
	}

	async promptChatGPT() {
		const { history, message } = this.state;

		if (!message) {
			return;
		}

		this.setState({
			loading: true,
		});

		let response = await promptChatGPT(
			history
				.filter((message) => message.length !== 4)
				.map((message) => [message[0], message[1]]),
			message
		);

		if (!response) {
			const completion =
				'Whoops! Something went wrong. Please try again.';
			response = {
				completion,
				history: [
					...history
						.filter((message) => message.length !== 4)
						.map((message) => [message[0], message[1]]),
					[message, completion],
				],
			};
		}

		let { completion, history: newHistory } = response;

		const time = new Date().toLocaleTimeString();
		const price =
			(getNTokens(message) / 1000) * 0.03 +
			(getNTokens(completion) / 1000) * 0.06;

		addChatPrice({
			email: getCookie('email'),
			price,
		});

		this.setState({
			history: [...history, [...newHistory[newHistory.length - 1], time]],
			loading: false,
			needscroll: true,
		});
	}

	scrollToBottom() {
		const history = this.historyRef.current;

		if (this.state.needscroll && history) {
			history.scrollTop = history.scrollHeight;

			this.setState({
				needscroll: false,
			});
		}
	}

	async setUsagePrices() {
		const email = getCookie('email');

		const imagePriceUsage = await getImagePriceUsage({
			email,
		});

		const chatPriceUsage = await getChatPriceUsage({
			email,
		});

		this.setState({
			imagePriceUsage,
			chatPriceUsage,
		});

		return { imagePriceUsage, chatPriceUsage };
	}

	async update() {
		this.scrollToBottom();

		// set ignoreUnescapedHTML to true
		hljs.configure({ ignoreUnescapedHTML: true });
		hljs.highlightAll();

		if (
			!this.imageUsageBarUsedRef?.current ||
			!this.chatUsageBarUsedRef?.current
		)
			return;

		this.imageUsageBarUsedRef.current.style.width = `${Math.min(
			(this.state.imagePriceUsage / this.state.maxImagePrice) * 100,
			100
		)}%`;

		this.chatUsageBarUsedRef.current.style.width = `${Math.min(
			(this.state.chatPriceUsage / this.state.maxChatPrice) * 100,
			100
		)}%`;
	}

	async componentDidMount() {
		const { chatPriceUsage, imagePriceUsage } = await this.setUsagePrices();
		this.update();

		if (imagePriceUsage >= this.state.maxImagePrice) {
			this.setState({
				imageQuotaMessage: true,
			});
		}

		if (chatPriceUsage >= this.state.maxChatPrice) {
			this.setState({
				chatQuotaMessage: true,
			});
		}

		const githubFollowing = await getUserGitHubFollowing({
			email: getCookie('email'),
		});

		if (githubFollowing) {
			this.setState({
				maxImagePrice: 0.4,
				maxChatPrice: 0.4,
			});
		}
	}

	async componentDidUpdate() {
		this.update();
	}

	render() {
		return (
			this.props.loaded &&
			(this.props.loggedIn ? (
				<div className='chatgpt'>
					<div className='history' ref={this.historyRef}>
						{this.state.history.length === 0 &&
							this.state.welcomeMessage && (
								<div className='history-message history-message-bot'>
									<div className='history-message-content'>
										<span className='history-message-info'>
											<i className='fa-solid fa-hand-wave history-message-info-icon' />
											Welcome to ChatGPT! Type a message
											to get started. (Version GPT-4!)
										</span>
										<FontAwesomeIcon
											icon={faMultiply}
											onClick={() => {
												this.setState({
													welcomeMessage: false,
												});
											}}
											className='history-message-close'
										/>
									</div>
								</div>
							)}
						{this.state.imagePriceUsage >=
							this.state.maxImagePrice &&
							this.state.imageQuotaMessage && (
								<div className='history-message history-message-bot'>
									<div className='history-message-content'>
										<span className='history-message-info'>
											<FontAwesomeIcon
												className='history-message-info-icon'
												icon={faExclamationCircle}
											/>
											You have used up your image
											generation quota.
										</span>
										<FontAwesomeIcon
											onClick={() => {
												this.setState({
													imageQuotaMessage: false,
												});
											}}
											icon={faMultiply}
											className='history-message-close'
										/>
									</div>
								</div>
							)}
						{this.state.chatPriceUsage >= this.state.maxChatPrice &&
							this.state.chatQuotaMessage && (
								<div className='history-message history-message-bot'>
									<div className='history-message-content'>
										<span className='history-message-info'>
											<FontAwesomeIcon
												icon={faExclamationCircle}
												className='history-message-info-icon'
											/>
											You have used up your chat
											generation quota.
										</span>
										<FontAwesomeIcon
											onClick={() => {
												this.setState({
													chatQuotaMessage: false,
												});
											}}
											icon={faMultiply}
											className='history-message-close'
										/>
									</div>
								</div>
							)}
						{this.state.githubFollowMessage && (
							<div className='history-message history-message-bot'>
								<div className='history-message-content'>
									<span className='history-message-info'>
										<FontAwesomeIcon
											icon={faInfoCircle}
											className='history-message-info-icon'
										/>
										<span>
											You can get more credit by following
											me on{' '}
											<Link
												to='/githubAuth'
												className='link'>
												GitHub
											</Link>
											!
										</span>
									</span>
									<FontAwesomeIcon
										icon={faMultiply}
										className='history-message-close'
										onClick={() => {
											this.setState({
												githubFollowMessage: false,
											});
										}}
									/>
								</div>
							</div>
						)}
						{this.state.history.map((message, index) => {
							const md = MarkdownIt({
								linkify: true,
								breaks: true,
							})
								.use(mdKatex)
								.use(mdHighlight);
							const isDalleGeneration = message.length === 4;

							let rendered;

							if (!isDalleGeneration) {
								let messageData = message[1];

								rendered = md.render(messageData);
							}

							return (
								<div key={index}>
									{index === this.state.history.length - 1 &&
										this.state.history.length > 1 && (
											<div className='newest-message-line'>
												<div className='newest-message-line-label'>
													New
												</div>
											</div>
										)}
									{!isDalleGeneration ? (
										<>
											<div className='history-message'>
												<FontAwesomeIcon
													className='message-icon user-icon'
													icon={faUser}
												/>
												<div className='message-content'>
													<div className='message-time'>
														{message[2]}
													</div>
													{message[0]}
												</div>
											</div>
											<div className='history-message history-message-bot'>
												<img
													src={ChatGPTIcon}
													className='message-icon'
													alt='ChatGPT'
												/>
												<div className='message-content'>
													<div className='message-time'>
														{message[2]}
													</div>
													<div
														className='chatgpt-completion'
														dangerouslySetInnerHTML={{
															__html: rendered,
														}}
													/>
												</div>
											</div>
										</>
									) : (
										<>
											<div className='history-message'>
												<FontAwesomeIcon
													className='message-icon user-icon'
													icon={faUser}
												/>
												<div className='message-content'>
													<div className='message-time'>
														{message[2]}
													</div>
													{message[0]}
												</div>
											</div>
											<div className='history-message history-message-bot'>
												<img
													src={ChatGPTIcon}
													className='message-icon'
													alt='ChatGPT'
												/>
												<div className='message-content'>
													<div className='message-time'>
														{message[2]}
													</div>
													<img
														src={message[1]}
														alt='Dalle Generation'
														className='dalle-generation'
													/>
													<Button
														label='Download'
														icon={faDownload}
														onClick={() =>
															downloadImage(
																message[1]
															)
														}
													/>
												</div>
											</div>
										</>
									)}
								</div>
							);
						})}
						{this.state.loading && (
							<div className='history-message history-message-bot'>
								<img
									src={ChatGPTIcon}
									className='message-icon'
									alt='ChatGPT'
								/>
								<div className='message-content'>
									<div className='message-time'>
										{new Date().toLocaleTimeString()}
									</div>

									<div className='chatgpt-completion'>
										<span>Thinking...</span>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className='chatgpt-controls'>
						<div className='chatgpt-input'>
							<Input
								label='Message'
								placeholder='Type a message...'
								value={this.state.message}
								onChange={(message = '') =>
									this.setState({ message })
								}
							/>
							<Button
								icon={faPaperPlane}
								big
								cta
								onClick={() => {
									this.promptChatGPT();
									this.setState({ message: '' });
								}}
								label='Send'
							/>
							<Button
								icon={faImage}
								big
								onClick={() => {
									this.generateDalleImage();
									this.setState({ message: '' });
								}}
								label='Generate Image'
							/>
							<span
								className={`open-usage-button ${
									this.state.usageOpen &&
									'open-usage-button-open'
								}`}
								onClick={this.toggleUsage.bind(this)}>
								{this.state.usageOpen ? 'Close' : 'Open'} Usage
							</span>
						</div>
						{this.state.usageOpen && (
							<div className='usage-container'>
								<div className='usage'>
									<span className='usage-label'>
										Images Used Up (
										{Math.max(
											Math.floor(
												(this.state.maxImagePrice -
													this.state
														.imagePriceUsage) /
													0.02
											),
											0
										)}{' '}
										Images Left):{' '}
									</span>
									<div className='usage-bar'>
										<div
											className='usage-bar-used'
											ref={this.imageUsageBarUsedRef}
										/>
									</div>
								</div>
								<div className='usage'>
									<span className='usage-label'>
										Chat Tokens Used Up (About{' '}
										{Math.max(
											Math.floor(
												(this.state.maxChatPrice -
													this.state.chatPriceUsage) /
													0.002
											),
											0
										)}
										k Chat Tokens Left):{' '}
									</span>
									<div className='usage-bar'>
										<div
											className='usage-bar-used'
											ref={this.chatUsageBarUsedRef}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className='chatgpt'>
					<div className='history' ref={this.historyRef}>
						<div className='history-message history-message-bot'>
							<span>
								Welcome to ChatGPT!{' '}
								<Link to='/login' className='link'>
									{' '}
									Login
								</Link>{' '}
								or{' '}
								<Link to='/signUp' className='link'>
									Sign Up
								</Link>{' '}
								to TamGames to get started.
							</span>
						</div>
						<div className='history-message buttons-message'>
							<Link to='/login'>
								<Button icon={faUser} cta label='Login' />
							</Link>
							<Link to='/signUp'>
								<Button icon={faUserPlus} label='Sign Up' />
							</Link>
						</div>
					</div>
					<div className='chatgpt-input'>
						<Input
							label='Message'
							placeholder='Type a message...'
							disabled
						/>
						<Button icon={faPaperPlane} big disabled label='Send' />
					</div>
				</div>
			))
		);
	}
}

export default ChatGPT;
