const style=document.createElement("style");
style.innerHTML=`
    *{
        box-sizing:border-box;
        padding:0;
        margin:0;
    }
    html,body{
        height:100%;
    }
    body{
        font-family: Arial, Helvetica, sans-serif;
        background-color:#2f3957;
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:15px;
        color:white;
        padding-top:15px;
    }
    .container>div:first-child>div{
        display:flex;
        gap:10px;   
        flex-wrap:wrap;
    }
    .container0{
        width:100%;
        display:flex;
        gap:10px;
        font-size:1.3em;
    }
    .container0 select{
        padding:5px;
        background-color: #2f3957;
        color: white;
        border: 2px solid white;
    }
    .container{
        background-color:#2f3957;
        outline:2px solid white;
        padding:15px;
    }
    .h{
        width:100%;
        height:500px;
        background-color:#181e2f;
        font-size:1.3em;
        padding:15px;
        overflow: auto;
    }
    .h span{
        border-radius:50%;
        background-color:#2f3957;
        display: inline-flex;
        width:25px;
        height:25px;
        justify-content:center;
        align-items:center;
    }
    .h:focus{
        outline:2px solid white;
        border:none;
    }
    .cong{
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background-color:#0000007d;
        display:none;
        justify-content:center;
        align-items:center;
        font-size:2em;
    }
    footer{
        color:white;
        width:100%;
        display:flex;
        justify-content:center;
        align-items: center;
        padding-bottom: 15px;
        box-sizing: border-box;
    }
    footer a{
        color:white;
        font-weight:600;
        text-decoration:none;
    }    
    @media (max-width:480px) {
        footer{
            flex-direction: column;
            align-items: center;
            gap:5px;
        }
    }
`;
document.querySelector("head").appendChild(style);
const container=document.createElement("div");
const container0=document.createElement("div");
container0.classList.add("container0");
let w=Math.floor((window.innerWidth*0.90));
if(window.innerHeight < window.innerWidth){
    w=640;
}
container.classList.add("container");
container.style=`
    width:${w}px;
    height:fit-content;
    direction:rtl;
    display:flex;
    flex-direction:column;
    gap:15px;
`;
const h1=document.createElement("h1");
h1.textContent="مساعدك في حفظ القرآن الكريم";
const cong=document.createElement("div");
cong.classList.add("cong");
cong.textContent="🎉 أحسنت(ي) لقد انتهيت(ي)";
cong.addEventListener("click",(e)=>{e.target.style.display="none";document.body.style.overflow="auto";});
const c0=document.createElement("div");
const c1=document.createElement("div");
const c2=document.createElement("div");
const label0=document.createElement("label");
label0.textContent="اختر السورة";
const surat=document.createElement("select");
const label1=document.createElement("label");
label1.textContent=`من`;
const fromaya=document.createElement("select");
c1.appendChild(label1);
c1.appendChild(fromaya);
const label2=document.createElement("label");
label2.textContent=`الي`;
const toaya=document.createElement("select");
c2.appendChild(label2);
c2.appendChild(toaya);
let st={};
const h=document.createElement("div");
h.classList.add("h");
h.innerHTML=`أولا يجب اختيار السورة و الآيات التي تريد حفضها`;
let all=[];
fetch("https://oufaddoul.com/Hifd-Al-Quran/get/q.json").then((d)=>d.json()).then((data)=>{
    all=data;
    surat.innerHTML+=`<option value='1000'>السور</option>`;
    data.forEach((v)=>{
        surat.innerHTML+=`
            <option value='${(v.t*5)}' ${(v.t==1)?"selected":""}>${v.arn}</option>
        `;
        surat.value="1000";
    });
});
let f=0;
surat.addEventListener("change",(e)=>{
    t=(Number(e.target.value)/5);
    for(let v of all){
        if(v.t == t){
            f=Number(v.an);
            fromaya.innerHTML="";
            fromaya.innerHTML+=`<option value='1000'>الآية</option>`;
            for(let i=1;i<=f;i++){
                fromaya.innerHTML+=`
                    <option value='${i}'>${i}</option>
                `;
            }
        }
    }
    fromaya.value="1000";
});
fromaya.addEventListener("change",(e)=>{
    const t=Number(e.target.value);
    toaya.innerHTML="";
    toaya.innerHTML+=`<option value='1000'>الآية</option>`;
    for(let i=t;i<=f;i++){
        toaya.innerHTML+=`
            <option value='${i}'>${i}</option>
        `;
    }
    toaya.value="1000";
});
let str="",aa=[],cm=0;
toaya.addEventListener("change",()=>{
    fetch(`https://oufaddoul.com/Hifd-Al-Quran/get/q/${((Number(t) > 100)?"c":(Number(t)>50)?"b":"a")}/65${t}89.json`).then((d)=>d.json()).then((data)=>{
        st=data[0].s;
        cp=0;
        aa=st.replaceAll(/\(\d{1,3}\)/g,"()").split("()");
        aa=aa.splice((Number(fromaya.value)-1),(Number(toaya.value)));
        let ind=Number(fromaya.value);
        str="";
        for(let i=0;i<aa.length;i++)
            str+=`${aa[i].trim()}(${ind++})`;
        aa=aa.map((v)=>v.trim());
        cm=Number(fromaya.value);
        h.innerHTML="";
        h.setAttribute("contenteditable","true");
        h.focus();
    });
});
let cp=0,canDel=true;
h.addEventListener("keydown",(e)=>{
    if(e.key === "Backspace" && !canDel)
        e.preventDefault();
    if(/\s/.test(e.key)){
        if((new RegExp(`^${h.textContent.split(" ").slice(-1)[0].replace(/\d{1,3}/,"").trim()}$`)).test(aa[cp].split(' ')[0])){
            canDel=false;
            aa[cp]=aa[cp].trim().split(" ").slice(1).join(" ");
            h.innerHTML+=" "+aa[cp].split(" ")[0];
            aa[cp]=aa[cp].trim().split(" ").slice(1).join(" ");
            if(aa[cp] === ""){
                cp++;
                h.innerHTML+=`&nbsp;<span>${cm++}</span>&nbsp;`;
                if(cm > Number(toaya.value))
                {
                    h.removeAttribute("contenteditable");
                    cong.style.display="flex";
                    document.body.style.overflow="hidden";
                }
            }
            h.focus();
            const range=document.createRange();
            const lastChild=h.lastChild;
            if(lastChild){
                range.setStartAfter(lastChild);
            }
            else{
                range.setStart(h,0);
            }
            range.collapse(true);
            const selection=window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    else if(e.key !== "Backspace")
        canDel=true;
});
c0.appendChild(label0);
c0.appendChild(surat);
container0.appendChild(c0);
container0.appendChild(c1);
container0.appendChild(c2);
container.appendChild(container0);
container.appendChild(h);
document.body.appendChild(h1);
document.body.appendChild(container);
document.body.appendChild(cong);
container.insertAdjacentHTML("afterend",`
                    <footer>This website is made with &#x1f499; by&nbsp;<a href="https://oufaddoul.com">Ayoub Oufaddoul</a></footer>

                `);




