 var comAPI = {
    VERSION: "1.1.0",
    initCallbackObj: null,
    _isFullscreen: false,
    get fullscreenEnabled() {
        var enabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
        return !!enabled
    },
    fullscreen: function(fullScreenElement) {
        if (!comAPI.fullscreenEnabled) {
            return
        }
        if (!fullScreenElement) {
            fullScreenElement = document.documentElement
        }
        if (fullScreenElement.requestFullscreen) {
            fullScreenElement.requestFullscreen()
        } else if (fullScreenElement.msRequestFullscreen) {
            fullScreenElement.msRequestFullscreen()
        } else if (fullScreenElement.mozRequestFullScreen) {
            fullScreenElement.mozRequestFullScreen()
        } else if (fullScreenElement.webkitRequestFullScreen) {
            fullScreenElement.webkitRequestFullScreen()
        }
    },
    exitFullscreen: function() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    },
    onFullscreenChanged: function(event) {
        comAPI._isFullscreen = !comAPI._isFullscreen
    }
};
comAPI.config = {
    ForJoyH5_InGameAdInterval: 30,
    ForJoyH5_InGameAdType: "0,1",
};
comAPI.resize = {
    _timerID: null,
    _queue: [],
    get sw() {
        return $(window).width()
    },
    get sh() {
        return $(window).height()
    },
    indexOf: function(callback, context) {
        var i = 0,
            len = this._queue.length;
        for (i = 0; i < len; i++) {
            var node = this._queue[i];
            if (node.callback == callback && node.context == context) {
                return i
            }
        }
        return -1
    },
    add: function(callback, context, params) {
        var index = this.indexOf(callback, context);
        if (index == -1) {
            if (params && params.constructor != Array) {
                params = [params]
            }
            this._queue.push({
                callback: callback,
                context: context,
                params: params
            })
        } else {

        }
    },
    remove: function(callbackOrIndex, context) {
        var index = -1;
        if (callbackOrIndex.constructor == Number) {
            index = callbackOrIndex
        } else {
            index = this.indexOf(callbackOrIndex, context)
        }
        if (index > -1) {
            delete this._queue[index];
            this._queue.splice(index, 1)
        } else {

        }
    },
    handler: function(event) {
        if (comAPI.resize._timerID) {
            clearTimeout(comAPI.resize._timerID)
        }
        comAPI.resize._timerID = setTimeout(comAPI.resize._onHandler, 50)
    },
    _onHandler: function(event) {
        var i = 0,
            len = comAPI.resize._queue.length;
        for (i = 0; i < len; i++) {
            var node = comAPI.resize._queue[i];
            try {
                var func = node.callback;
                var context = node.context;
                var params = node.params;
                func.apply(context, params)
            } catch (e) {
                this.remove();
            }
        }
    }
};

comAPI.ad = {
    _callbackObj: null,
    intervalID: -1,
    _lastInGameAdTime: -1,
    _loaded: false,
    _isAds: false,
    _requesting: false,
    _imaContainer: null,
    _videoContent: null,
    _adsManager: null,
    _adsLoader: null,
    _adsRequest: null,
    _finishedPre: false,
    get finishedPre() {
        return this._finishedPre
    },
    set finishedPre(value) {
        this._finishedPre = value
    },
    get adType() {
        var typeSrc = comAPI.config.ForJoyH5_PreGameAdType;
        if (comAPI.ad.finishedPre) {
            typeSrc = comAPI.config.ForJoyH5_InGameAdType
        }
        switch (typeSrc) {
            case 0:
                return "all";
                break;
            case 1:
                return "onlyskipable";
                break;
            case 2:
                return "no";
                break
        }
    },
    get adTagUrl() {
        var _adTagUrl = "";
       if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            var _adTagUrl = "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=";
            console.log(_adTagUrl);
        }
        else {
            var descriptionURL = encodeURIComponent(window.location);
            if(!comAPI.ad._isAds) {
                var _adTagUrl = "https://pubads.g.doubleclick.net/gampad/ads?iu=/21739493398/Games-ADX-AFG&description_url=" + descriptionURL + "&tfcd=0&npa=0&sz=640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";
            }
            else {
                var _adTagUrl = "https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-4764333688337558&description_url=" + descriptionURL + "&channel=7323774292&videoad_start_delay=0&hl=en&max_ad_duration=30000";
            }
            console.log(_adTagUrl);
        }
      
        return _adTagUrl
    },
    check: function() {
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            comAPI.config.debug = true;
            return true
        }
        if (typeof google == "undefined" || typeof google.ima == "undefined") {
            comAPI.loading.hideLoadingGif();
            setTimeout(function() {
                $("#blocktip").css("visibility", "visible")
            }, 100);
            return false
        }
        return true
    },
    _init: function() {
        if (comAPI.ad.intervalID == -1) {
            comAPI.ad.intervalID = setTimeout(comAPI.ad.onAdClose, 3e4);
        }
        comAPI.ad._imaContainer = $("#imaContainer")[0];
        comAPI.ad._videoContent = $("#imaVideo")[0];
        var adDisplayContainer = new google.ima.AdDisplayContainer(comAPI.ad._imaContainer, comAPI.ad._videoContent);
        adDisplayContainer.initialize();
        comAPI.ad._adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        comAPI.ad._adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, comAPI.ad.onAdsManagerLoaded, false);
        comAPI.ad._adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, comAPI.ad.onAdError, false);
        comAPI.ad._videoContent.onended = comAPI.ad.contentEndedListener;
        comAPI.ad._adsRequest = new google.ima.AdsRequest;
        comAPI.ad._adsRequest.adTagUrl = comAPI.ad.adTagUrl;
        comAPI.ad._adsRequest.linearAdSlotWidth = $(window).width();
        comAPI.ad._adsRequest.linearAdSlotHeight = $(window).height();
        comAPI.ad._adsRequest.nonLinearAdSlotWidth = $(window).width();
        comAPI.ad._adsRequest.nonLinearAdSlotHeight = $(window).height();
        comAPI.ad._adsRequest.forceNonLinearFullSlot = true;
        comAPI.resize.add(comAPI.ad.resizeAd, comAPI.ad)
    },
    init: function() {
        var refer = document.referrer;
        refer = refer.substr(refer.indexOf("://") + 1);
        if ((comAPI.config.ForJoyH5_ShowPreGameAd || refer.indexOf(comAPI.config.host) == 0) && comAPI.config.ForJoyH5_stats) {
            comAPI.ad.show()
        } else {
            comAPI.ad.onAdClose();
        }
    },
    onAdsManagerLoaded: function(adsManagerLoadedEvent) {
        comAPI.ad._adsManager = adsManagerLoadedEvent.getAdsManager(comAPI.ad._videoContent);
        comAPI.ad._adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, comAPI.ad.onAdError);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, comAPI.ad.onAllAdsCompleted);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, comAPI.ad.onUserClose);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, comAPI.ad.onAdComplete);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, comAPI.ad.onAdLoaded);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, comAPI.ad.onTypeTest2);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.AD_METADATA, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, comAPI.ad.onPauseGame);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, comAPI.ad.onResumeGame);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.DURATION_CHANGE, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.LINEAR_CHANGED, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.LOG, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, comAPI.ad.onTypeTest);
        comAPI.ad._adsManager.init(window.innerWidth, window.innerHeight, google.ima.ViewMode.FULLSCREEN);
        comAPI.ad._adsManager.start()
    },
    onPauseGame: function(event) {
       // pause game
    },
    onResumeGame: function(event) {
        // resume game
        comAPI.ad.onAdClose();
    },
    onTypeTest2: function(event) {
         try {
            setTimeout(function () {
                $("#MobileAdInGamePreroll").show();
            }, 2000);
        }catch(error){ }
    },
    onTypeTest: function(event) {},
    onAdLoaded: function(event) {
        clearTimeout(comAPI.ad.intervalID);
        $(comAPI.ad._imaContainer).css("visibility", "visible");
        $(comAPI.ad._imaContainer).children(":first").css("visibility", "visible");
        comAPI.ad._loaded = true;
        var contentType = comAPI.ad._adsManager.getCurrentAd().getContentType();
        var type = 0;
        if (contentType == "text") {
            type = 0
        } else if (contentType == "image/png") {
            type = 1
        } else {
            type = 2
        }
    },
    contentEndedListener: function() {
        comAPI.ad._adsLoader.contentComplete()
    },
    onAdError: function(adErrorEvent) {

        console.warn(adErrorEvent.getError());
        comAPI.ad.onAdClose()

        if(comAPI.ad._isAds == false) {
            comAPI.ad._isAds = true;
            comAPI.ad._init();
            ShowAds();
        }

        try {
                setTimeout(function () {
                    $("#MobileAdInGamePreroll").show();
                }, 10000);
        }catch(error){ }
    },
    onAdComplete: function(event) {
        try {
            setTimeout(function () {
                $("#MobileAdInGamePreroll").show();
            }, 2000);
        }catch(error){ }
    },
    onAllAdsCompleted: function(event) {
        comAPI.ad.onAdClose();
    },
    onAdClose: function() {
        var type = "AD_CLOSE";
        if (comAPI.ad.finishedPre == false) {
            type = type + "_PRE";
            comAPI.ad.finishedPre = true
        }
        comAPI.ad.close();
    },
    onUserClose: function(event) {
        comAPI.ad.onAdClose();
        try {
            setTimeout(function () {
                $("#MobileAdInGamePreroll").show();
            }, 2000);
        }catch(error){ }
    },
    resizeAd: function() {
        if (comAPI.ad._adsManager) {
            comAPI.ad._adsManager.resize($(window).width(), $(window).height(), google.ima.ViewMode.FULLSCREEN)
        }
    },
    _onFinishedAd: function() {
        var showedRAD = comAPI.ad._onExecRAD();
        if (!showedRAD) {
            comAPI.ad._onExecIAD()
        }
        comAPI.ad._callbackObj = null
    },
    _onExecIAD: function() {
        var obj = comAPI.ad._callbackObj;
        if (!obj) {
            return false
        }
        var callback = obj.callback;
        var thisObj = obj.thisObj;
        var args = obj.args;
        return true
    },
    _onExecRAD: function() {
        var obj = comAPI.ad._callbackObj;
        if (!obj) {
            return false
        }
        var callback = obj.successCallback;
        var thisObj = obj.successThis;
        var args = obj.successArgs;
        return true
    },
    getShowable: function(force) {
        if (comAPI.ad._lastInGameAdTime === -1 || force) {
            return true
        }
        var now = (new Date).getTime();
        var interval = now - comAPI.ad._lastInGameAdTime;
        if (interval >= comAPI.config.ForJoyH5_InGameAdInterval * 1e3) {
            return true
        } else {
            var least = Math.ceil(comAPI.config.ForJoyH5_InGameAdInterval - interval / 1e3);
            return false
        }
    },
    updateLastInGameAdTime: function() {
        var now = (new Date).getTime();
        comAPI.ad._lastInGameAdTime = now
    },
    show: function(callbackObj, force) {
    
        var canShow = comAPI.ad.getShowable(force);
        comAPI.ad._callbackObj = callbackObj;
        if (!canShow && callbackObj) {
            comAPI.ad._onFinishedAd();
            return
        }
        if (!comAPI.ad._adsRequest) {
            comAPI.ad._init()
        }
        if (comAPI.ad._requesting) {
            return
        }
        if (canShow || force) {
            comAPI.ad._requesting = true;
            clearTimeout(comAPI.ad.intervalID);
            comAPI.ad.intervalID = setTimeout(comAPI.ad.onAdClose, 3e4);
            $(comAPI.ad._imaContainer).css("display", "");
            comAPI.ad._adsLoader.requestAds(comAPI.ad._adsRequest);
            comAPI.ad.resizeAd()
        } else {
            comAPI.ad._onFinishedAd()
        }
    },
    close: function() {
        if (comAPI.ad._loaded == true) {
            comAPI.ad.updateLastInGameAdTime()
        }
        comAPI.ad._requesting = false;
        comAPI.ad._loaded = false;
        clearTimeout(comAPI.ad.intervalID);
        comAPI.ad._adsManager && comAPI.ad._adsManager.destroy();
        $(comAPI.ad._imaContainer).css("display", "none");
        comAPI.ad._onFinishedAd();
    }
};

  function ShowAds() 
        {
           if (comAPI.ad.getShowable()) {
                        var obj = {
                            callback: function() {
                            }
                        };
                        comAPI.ad.show(obj, true)
                    } else {

                    }
        }

$(document).ready(function() {
 var strVar = "" + '<div id="imaContainer">' + '<video id="imaVideo"></video>' + "</div>" + '<div id="blocktip">' + "<p>Please disable the ad blocker, and then refresh the page to enjoy the game, for free! </p>" + "<br>" + "<p>Thank you for your support.</p>" + "<br>" + '<a href="//help.stan.com.au/hc/en-us/articles/204778087-How-do-I-disable-AdBlock-" target="_blank">How to disable it?</a>' + "</div> ";
    $(document.body).append(strVar);
});