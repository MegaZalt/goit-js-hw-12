import{a as w,S as L,i}from"./assets/vendor-D7MeyRd-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const b="46143804-c250369a659784c87f3539553",E="https://pixabay.com/api/";async function m(e,t=1,n=15){try{return(await w.get(E,{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:n}})).data}catch(r){throw console.log("Error fetching images:",r),r}}let y=null;function v(e){const t=document.querySelector(".gallery"),n=e.map(r=>`
      <div class="gallery-item">
      <a href="${r.largeImageURL}">
           <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
           </a>
         </div>`).join("");t.innerHTML=n,y=new L(".gallery a")}function R(e){const t=document.querySelector(".gallery"),n=e.map(r=>`
     <div class="gallery-item">
     <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
          </a>
        </div>
      `).join("");t.insertAdjacentHTML("beforeend",n),y.refresh()}const q=document.getElementById("searchForm"),B=document.querySelector(".gallery"),I=document.getElementById("loader"),p=document.getElementById("loadMoreBtn");let c="",a=1;const u=15;let f=0;function d(e){I.style.display=e?"block":"none"}function l(e){p.style.display=e?"block":"none"}function M(){B.innerHTML=""}function h(){i.show({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",color:"blue",position:"topRight"})}q.addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("query").value.trim();if(S(),t!==c&&(c=t,a=1,M()),!t){i.show({title:"Warning",message:"No images found for this query!",color:"yellow",position:"topRight"});return}d(!0),l(!1);try{const n=await m(c,a,u);if(f=n.totalHits,n.hits.length===0){i.show({title:"Warning",message:"No images found for this query!",color:"yellow",position:"topRight"});return}v(n.hits),a*u<f?l(!0):(l(!1),h()),P()}catch(n){console.error(n),i.show({title:"Error",message:"Failed to load images!",color:"red",position:"topRight"})}finally{d(!1)}});p.addEventListener("click",async()=>{d(!0),l(!1),a++;try{const e=await m(c,a,u);R(e.hits),a*u>f?(h(),l(!1)):l(!0)}catch(e){console.error("Error loading more images:",e),i.show({title:"Error",message:"Could not load more images. Please try again later.",color:"red",position:"topRight"})}finally{d(!1)}});function P(){const e=document.querySelectorAll(".gallery-item");if(e.length>0){const{height:t}=e[0].getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}else window.scrollBy({top:100,behavior:"smooth"})}function S(){const e=document.querySelector(".end-message");e&&e.remove()}
//# sourceMappingURL=index.js.map
