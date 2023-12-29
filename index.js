//variables
const generalBtn=document.getElementById("genral");
const businessBtn=document.getElementById("business");
const sportsBtn=document.getElementById("sport");
const TechnologyBtn=document.getElementById("technology");
const EntertainmentBtn=document.getElementById("entertainment");
const searchBtn=document.getElementById("searchBtn");
const newsQuery=document.getElementById("newsQuery");
const newstype=document.getElementById("newsType");
const newsdetails=document.getElementById("newsdetails");
//Array
var newsDataArr=[];

//apis
const API_KEY="6731e06efeb54515b8a9b0a73064741e";
const Headlines_News="https://newsapi.org/v2/top-headlines?country=in&apiKey=6731e06efeb54515b8a9b0a73064741e";
const General_News="https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=6731e06efeb54515b8a9b0a73064741e";
const Business_News="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=6731e06efeb54515b8a9b0a73064741e";
const Sports_News="https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=6731e06efeb54515b8a9b0a73064741e";
const Technology_News="https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=6731e06efeb54515b8a9b0a73064741e";
const Entertainment_News="https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=6731e06efeb54515b8a9b0a73064741e";
const Search_News="https://newsapi.org/v2/everything?q="

window.onload=function(){
    newstype.innerHTML="<h3><b>Headlines</b></h3>";
    fetchHeadlines();

};
generalBtn.addEventListener("click",function(){
    newstype.innerHTML="<h3><b>General News</b></h3>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click",function(){
    newstype.innerHTML="<h3><b>Business News</b></h3>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function(){
    newstype.innerHTML="<h3><b>Sports News</b></h3>";
    fetchSportsNews();
});

TechnologyBtn.addEventListener("click",function(){
    newstype.innerHTML="<h3><b>Technology News</b></h3>";
    fetchTechnologyNews();
});

EntertainmentBtn.addEventListener("click",function(){
    newstype.innerHTML="<h3><b>Entertainment News</b></h3>";
    fetchEntertainmentNews();
});

searchBtn.addEventListener("click",function(){
    newstype.innerHTML="<h3><b>Search : "+newsQuery.value+"</b></h3>";
    fetchQueryNews();
});

const fetchHeadlines = async()=>{
    const response=await fetch(General_News);
    newsDataArr=[];
    if(response.status>=200&&response.status<300){
        const myJson=await response.json();
        newsDataArr=myJson.articles;
    }else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchGeneralNews = async()=>{
    const response=await fetch(Headlines_News);
    newsDataArr=[];
    if(response.status>=200&&response.status<300){
        const myJson=await response.json();
        newsDataArr=myJson.articles;
    }else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchBusinessNews = async()=>{
    const response=await fetch(Business_News);
    newsDataArr=[];
    if(response.status>=200&&response.status<300){
        const myJson=await response.json();
        newsDataArr=myJson.articles;
    }else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchSportsNews = async()=>{
    const response=await fetch(Sports_News);
    newsDataArr=[];
    if(response.status>=200&&response.status<300){
        const myJson=await response.json();
        newsDataArr=myJson.articles;
    }else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchTechnologyNews= async()=>{
    const response=await fetch(Technology_News);
    newsDataArr=[];
    if(response.status>=200&&response.status<300){
        const myJson=await response.json();
        console.log(myJson);
        newsDataArr=myJson.articles;
    }else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchEntertainmentNews= async()=>{
    const response=await fetch(Entertainment_News);
    newsDataArr=[];
    if(response.status>=200&&response.status<300){
        const myJson=await response.json();
        newsDataArr=myJson.articles;
    }else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}

const fetchQueryNews=async()=>{
    if(newsQuery.value==null)
          return;

    const response=await fetch(Search_News+encodeURIComponent(newsQuery.value)+"&apiKey"+API_KEY);
    newsDataArr=[];
    if(response.status>=200&&response.status<300){
        const myJson= await response.json();   
        newsDataArr=myJson.articles;   
    }else{
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}
function displayNews(){
    newsdetails.innerHTML="";

    if(newsDataArr.length==0){
        newsdetails.innerHTML="<h5> No  data found.</h5>";
        return;
    }

    newsDataArr.forEach(news=>{
        var date=news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";
        var card = document.createElement('div');
        card.className="p-2";
        var image=document.createElement('img');
        image.setAttribute("height","matchparnt");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;
        var cardBody=document.createElement('div');

        var newsheading=document.createElement('h5');
        newsheading.className="card-title";
        newsheading.innerHTML=news.title;

        var dateheading=document.createElement('h6');
        dateheading.className="text-primary";
        dateheading.innerHTML=date[0];

        var discription=document.createElement('p');    
        discription.className="text-muted";
        discription.innerHTML=news.discription;

        var link=document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target","_blank");
        link.href=news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsheading);
        cardBody.appendChild(dateheading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);


        newsdetails.appendChild(col);



    });

}