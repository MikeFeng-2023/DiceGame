document.querySelector("#editPlayer01").addEventListener("click", function(){
  document.querySelector("#player01NameInput").hidden=false;
  document.querySelector("#player01Name").hidden=true;
});

document.querySelector("#editPlayer02").addEventListener("click", function(){
  document.querySelector("#player02NameInput").hidden=false;
  document.querySelector("#player02Name").hidden=true;
});

document.querySelector("#player01NameInput").addEventListener("keydown", function(event){
  if(event.keyCode==13){
    var text = document.querySelector("#player01NameInput").value;
    //console.log(text);
    if(String(text).length<=20){
      document.querySelector("#player01Name").textContent = text;
      document.querySelector("#player01Name").hidden=false;
      document.querySelector("#player01NameInput").hidden=true;
    }
    else{
      alert("Name must be 20 characters or less!")
    }
  }
});

document.querySelector("#player02NameInput").addEventListener("keydown", function(event){
  if(event.keyCode==13){
    var text = document.querySelector("#player02NameInput").value;
    //console.log(text);
    if(String(text).length<=20){
      document.querySelector("#player02Name").textContent = text;
      document.querySelector("#player02Name").hidden=false;
      document.querySelector("#player02NameInput").hidden=true;
    }
    else{
      alert("Name must be 20 characters or less!")
    }
  }
});

let scorePlayer01 = 0;
let scorePlayer02 = 0;

document.querySelector("#start-btn").addEventListener("click",async function(){
  await flashDice();
  let result = 0
  while(result==0){
    result = compare();
  }

  if(result==1){
    scorePlayer01++;
    let name = document.querySelector("#player01Name").innerText;
    document.querySelector("#roundWinner").textContent = `${name} wins this round!`;
  }
  if(result==2){
    scorePlayer02++;
    let name = document.querySelector("#player02Name").innerText;
    document.querySelector("#roundWinner").textContent = `${name} wins this round!`;
  }

  document.querySelector("#totalResult").innerText = `Total results: ${scorePlayer01} vs ${scorePlayer02}`;

});

document.querySelector("#reset-btn").addEventListener("click", function(){
  scorePlayer01 = 0;
  scorePlayer02 = 0;
  document.querySelector("#roundWinner").textContent = ``;
  document.querySelector("#totalResult").innerText = `Total results: ${scorePlayer01} vs ${scorePlayer02}`;
});

 async function flashDice(){
  for(let i=1; i<=6; i++){
    let strNum = "";
    if(i==1)
      strNum = "one";
    if(i==2)
      strNum="two";
    if(i==3)
      strNum="three";
    if(i==4)
      strNum="four";
    if(i==5)
      strNum = "five";
    if(i==6)
      strNum ="six";
    await delay(500);
      document.querySelector("#player01Dice").src=`/images/${strNum}.jpg`;
      document.querySelector("#player02Dice").src=`/images/${strNum}.jpg`;

  }
}

function delay(time){
  return new Promise(resolve=> setTimeout(resolve, time));
}

function getDiceNumber(){
  let randomNum = Math.random();
  let result = "";
  if(randomNum<0.167){
    result ="one-1";
  }else if(randomNum<0.333){
    result ="two-2";
  }else if(randomNum<0.5){
    result ="three-3";
  }else if(randomNum<0.667){
    result ="four-4";
  }else if(randomNum<0.833){
    result = "five-5";
  }else{
    result = "six-6";
  }
  return result;
}

function compare(){
  let resultPlay01 = getDiceNumber().split("-");
  let resultPlay02 = getDiceNumber().split("-");
  //console.log(resultPlay01);
  document.querySelector("#player01Dice").src=`/images/${resultPlay01[0]}.jpg`;
  document.querySelector("#player02Dice").src=`/images/${resultPlay02[0]}.jpg`;

  let numPlayer01 = Number(resultPlay01[1]);
  let numPlayer02 = Number(resultPlay02[1]);
  if(numPlayer01>numPlayer02)
    return 1;
  if(numPlayer01<numPlayer02)
    return 2;
  if(numPlayer01==numPlayer02)
    return 0;
}