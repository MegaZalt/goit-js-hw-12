import{a as p,S as L,i as l}from"./assets/vendor-D7MeyRd-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const w="46143804-c250369a659784c87f3539553",E="https://pixabay.com/api/";async function h(t,r=1,s=15){const a=`${E}?key=${w}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${s}`;try{return(await p.get(a)).data}catch(e){throw console.log("Error fetching images:",e),e}}let g=null;function v(t){const r=document.querySelector(".gallery");r.innerHTML="";const s=t.map(a=>`
    <div class="gallery-item">
        <a href="${a.largeImageURL}">
          <img src="${a.webformatURL}" alt="${a.tags}" loading="lazy" />
        </a>
      </div>`).join("");r.innerHTML=s,g?g.refresh():g=new L(".gallery a",{captionsData:"alt",captionsDelay:250})}const P=document.getElementById("searchForm"),I=document.querySelector(".gallery"),y=document.getElementById("loader"),f=document.getElementById("loadMoreBtn");let i="",n=1;const m=15;function c(t){t?y.classList.remove("hidden"):y.classList.add("hidden")}function d(t){t?f.classList.remove("hidden"):f.classList.add("hidden")}function b(){I.innerHTML=""}P.addEventListener("submit",async t=>{t.preventDefault();const r=document.getElementById("query").value.trim();if(r!==i&&(i=r,n=1,b()),!r){l.show({title:"Warning",message:"Please enter a search query!",color:"yellow",position:"topRight"});return}c(!0),d(!1);try{const s=await h(i,n,m);s.hits.length===0?l.show({title:"Warning",message:"Please enter a search query!",color:"yellow",position:"topRight"}):(v(s.hits),n++,d(!0))}catch(s){console.log(s),l.show({title:"Error",message:"Failed to load images!",color:"red",position:"topRight"})}finally{c(!1)}});f.addEventListener("click",async()=>{c(!0);try{const t=await h(i,n,m);t.hits.length>0?(appendGallery(t.hits),n++):d(!1),t.hits.length<m&&d(!1)}catch(t){console.log("Error loading more images:",t),l.show({title:"Error",message:"Could not load more images. Please try again later.",color:"red",position:"topRight"})}finally{c(!1)}});
//# sourceMappingURL=index.js.map
