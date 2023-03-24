import { gitHubOAuthURL } from 'modules/web';
import { Link } from 'react-router-dom';
import './GitHubAuth.scss';

function GitHubAuth() {
	return (
		<div className='github-auth'>
			<h1>GitHub Auth</h1>
			<ol>
				<li>
					<span>
						Follow me on{' '}
						<Link
							className='link'
							onClick={() =>
								window.open('https://github.com/nekumelon')
							}>
							GitHub
						</Link>
					</span>
				</li>
				<li>
					<span>
						<Link
							className='link'
							onClick={() => window.open(gitHubOAuthURL())}>
							Authorize
						</Link>{' '}
						TamGames to read your GitHub profile
					</span>
				</li>
				<li>
					<span>
						You will be redirected to the home page, and will have
						your free credit!
					</span>
				</li>
			</ol>
		</div>
	);
}

export default GitHubAuth;
