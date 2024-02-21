const CharacterContainer=document.querySelector("#CharacterContainer"),CharactersPerPage=5;let currentPage=1;const TotalCharactersLimit=35;let loadedCharacters=0;const FetchCharacter=async()=>{if(!(loadedCharacters>=TotalCharactersLimit))for(let a=(currentPage-1)*CharactersPerPage+1;a<=currentPage*CharactersPerPage&&loadedCharacters<TotalCharactersLimit&&(await GetCharacters(a),loadedCharacters++,!(loadedCharacters>=TotalCharactersLimit));a++);},GetCharacters=async a=>{const b=await fetch(`https://dragonball-api.com/api/characters/${a}`),c=await b.json();RenderImages(c)},RenderImages=a=>{const b=document.createElement("div");b.classList.add("Character");const c=a.name[0].toUpperCase()+a.name.slice(1),d=a.race?a.race[0]:"Unknown",e=a.maxKi?a.maxKi.toString().padStart(3,"0"):"---",f=`
    <div class="dragon_image">
      <img src="${a.image}" alt="${c}">
    </div>
    <div class="info">
      <h3 class="name">${c}</h3>
      <span class="race">Race: ${d}</span>
      <small class="ki">Ki: <span>${e}</span></small>
    </div>
  `;b.innerHTML=f,CharacterContainer.appendChild(b)},loadMoreCharacters=()=>{const a=window.innerHeight+window.scrollY,b=CharacterContainer.getBoundingClientRect().bottom+window.scrollY;a>=b&&loadedCharacters<TotalCharactersLimit&&(currentPage++,FetchCharacter())};window.addEventListener("scroll",loadMoreCharacters),FetchCharacter();