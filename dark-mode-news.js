//name dark mode news
//; v.1.0.0 (2024/2/15 8:23)
//matches https://www.jiji.com/*, https://www.47news.jp/*, https://www.yomiuri.co.jp/*, https://www.asahi.com/*, https://mainichi.jp/*, https://*.nhk.or.jp/*, https://www.nikkei.com/*, https://jp.reuters.com/*, https://www.cnn.co.jp/*, https://www.bbc.com/*, https://www.afpbb.com/*, https://forbesjapan.com/*, https://news.yahoo.co.jp/*, https://www.bloomberg.co.jp/*
//option start
//js
(function(){
	function log(){
		console.log.apply(console,["[dark mode news]"].concat(Array.from(arguments)));
	}
	log("started");
	function detectColorScheme(e){
		const bc = getComputedStyle(e).backgroundColor;
		log("backgroundColor:", bc);
		const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)/.exec(bc);
		if (! m){ throw Error("backgroundColor must be rgb(\d+,\d+\d+)"); }
		log("m:", m);
		return [m[1], m[2], m[3]].some(n => n > 50) || m[4] === "0" ? "light" : "dark";
	}
	function darken(){
		const params = new URLSearchParams(location.search);
		let paramColorScheme = params.get("dmn-color-scheme");
		if (! (paramColorScheme === "dark" || paramColorScheme === "light")){
			paramColorScheme = "auto";
		}
		log("paramColorScheme:", paramColorScheme);
		const systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
		log("systemColorScheme:", systemColorScheme);
		const requiredColorScheme = paramColorScheme === "auto" ? systemColorScheme : paramColorScheme;
		log("requiredColorScheme:", requiredColorScheme);
		const detectedColorScheme = detectColorScheme(document.body);
		log("detetedColorScheme:", detectedColorScheme);
		const availableColorScheme = getComputedStyle(document.body).colorScheme.split(" ").filter(e => e);
		log("availableColorScheme:", availableColorScheme);
		if (availableColorScheme.includes(requiredColorScheme)){
			log(`page support ${requiredColorScheme} mode.`, requiredColorScheme === detectedColorScheme ? "nothing to do" : `but detected ${detectedColorScheme} mode! I don't know what to do.`);
			return;
		}
		if (detectedColorScheme === requiredColorScheme){
			log("detected color scheme matches reqired color scheme. nothing to do.");
			return;
		}
		log("required:", requiredColorScheme, "/ detected:", detectedColorScheme);
		if (requiredColorScheme === "dark"){
			const className = "dark-mode-news-dark-mode",
				id = className + "-style",
				buttonId = "dark-mode-news-recovery-button";
			let e = document.createElement("style");
			e.id = id;
			e.textContent = `
				 body.${className} {
					background-color: Canvas;
					color: CanvasText;
					color-scheme: ${requiredColorScheme};
				}
				.${className} * {
					background-color: Canvas !important;
					color: CanvasText !important;
				}
				.${className} a:link {
					color: LinkText !important;
				}
				.${className} a:visited {
					color: VisitedText !important;
				}
				#${buttonId} {
					border: solid;
					width: 32px;
					height: 32px;
					background-image: url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" ><rect x="0" y="0" width="500" height="500" style="fill:none;stroke:none;"/><path d="M0,499l499,-499l0,499Z"  style="fill:black;stroke:black;stroke-width:5px"/><path d="M0,0l499,0l-499,499Z" style="fill:white;stroke:black;stroke-width:10px"/></svg>');
					padding: initial;
					position: fixed;
					bottom: 10px;
					right: 10px;
					z-index:2147483647;
				}
				`;
			document.getElementsByTagName("head")[0].append(e);
			document.body.classList.add(className);
			log("changed color scheme. okay?");
			e = document.createElement("div");
			e.id = buttonId;
			e.addEventListener("click", ev =>{
				document.body.classList.toggle(className);
			});
			document.body.append(e);
			if (/\breuters.com$/.test(location.hostname)){
				// react prevents changing to dark mode. so disable react.
				const e = document.getElementById("fusion-app");
				if (e) {
					e.id = "disabled-fusion-app";
					log("disabled react fusion-app");
				}
			}
			// some page sets class attribute later.
			const observer = new MutationObserver((mutations, observer)=>{
				mutations.forEach((m,i)=>{
					if (m.type === "attributes"){
						if (m.attributeName === "class"){
							if (! document.body.classList.contains(className)){
								observer.disconnect();
								log("className removed. adding name again.");
								document.body.classList.add(className);
							}
						}
					};
				});
			});
			observer.observe(document.body, {attributes: true});
			setTimeout(function(){ observer.disconnect(); }, 1000);
			log("monitoring document.body attributes");
		}
	}
	if (document.body){ darken(); }
	else {
		new MutationObserver((mutations, observer)=>{
			mutations.forEach((m,i)=>{
				if (m.type !== "childList"){ return; }
				m.addedNodes.forEach(n =>{
					if (! (n && n.nodeType === Node.ELEMENT_NODE)){ return; }
					if (n.tagName === "BODY"){
						log("got body");
						observer.disconnect();
						document.body ? darken() : setTimeout(darken, 0);
					}
				});
			});
		}).observe(document.documentElement, {childList: true});
		log("monitoring mutation");
	}
})();