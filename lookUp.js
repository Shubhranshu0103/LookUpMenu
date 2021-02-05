var SL = (function(){
  var _SearchEngines_ = [

    {
      name: "Amazon-India",
      url : "https://www.amazon.in/s?k="
    },
    {
      name :  "Google",
      url : "https://www.google.com/search?q="
    },
    {
      name  : "Ecosia",
      url : "https://www.ecosia.org/search?q="
    }
        
  ];
  var btnGrp = null;
  var btns = [];

 

  function createButtonGroup(){
    btnGrp = document.createElement("div");
    btnGrp.classList.add("btnGrp");
    createButtons();
    for(let i=0;i<_SearchEngines_.length;i++)
      {
        
        console.log("Added btn: "+btnGrp.appendChild(btns[i]));
      }

  }

  function createButtons()
  {
    for(let i=0;i<_SearchEngines_.length;i++)
    {
      btns[i] = document.createElement("a");
      btns[i].classList.add("lookupButton");
      console.log("Adding attribute id :  "+_SearchEngines_[i].name);
      btns[i].setAttribute("id",_SearchEngines_[i].name);
      btns[i].setAttribute("href",_SearchEngines_[i].url);
      btns[i].setAttribute("target","_blank");
      btns[i].innerHTML = "Search with "+_SearchEngines_[i].name;
    }
  }


  return {
      btnGrpDisplayType : Object.freeze({
      BLOCK : "block",
      NONE  : "none"
  
    }),
    
    getBtnGrp : function()
    {
      if(btnGrp == null)
        createButtonGroup();

        return btnGrp;
    },

    getButtons  : function()
    {
      this.getBtnGrp();
      return btns;
    },

    addSearchQuery  : function(qry)
    {
      this.getBtnGrp();

      for(let i=0; i<_SearchEngines_.length; i++)
      {
        btns[i].setAttribute("href", _SearchEngines_[i].url+encodeURIComponent(qry));
      }
    },

    setPosition : function(clientRec)
    {

      if(clientRec == null)
      return;

      this.getBtnGrp();
      btnGrp.style.top = (clientRec.top-btnGrp.offsetHeight>0?clientRec.top-btnGrp.offsetHeight:0) + "px";
      btnGrp.style.left = ((clientRec.left+clientRec.right)/2-25)+"px";
      console.log("lookup offset Height: "+btnGrp.offsetHeight);
    
    },

    setDisplay : function(Dtype)
    {
      this.getBtnGrp();
      btnGrp.style.display = Dtype;
    },

    getDisplay  : function()
    {
      return btnGrp.style.display;
    },
    
    printSearchEngines  : function()
    {
      for(let i=0;i<_SearchEngines_.length;i++)
      {
        console.log("SE Name: "+_SearchEngines_[i].name);
      }
    },

    getSearchEngines  : function()
    {
      return _SearchEngines_;
    },

    run : function()
    {
      document.body.appendChild(SL.getBtnGrp());
      var selectStart = false;
      var clientRec = null;
      
      document.onselectstart = function() {
          console.log('Selection started!');
          selectStart = true;
        };
      
      document.onmousedown = function(event){
          
        if( event.target !=SL.getBtnGrp() && SL.getButtons().every(function(bt){
          
          return event.target!=bt;
        }) )
        {
            if(SL.getDisplay() == SL.btnGrpDisplayType.BLOCK)
              {
                SL.setDisplay(SL.btnGrpDisplayType.NONE);
              
              }
            
        }
  
        else
        {
          console.log("Event target was overlay");
        }
      }
      
      
      
      document.addEventListener('click', event => {
    
        
        if(selectStart == true)
        {
          selectStart = false;
          var selection = document.getSelection();
          if(selection.isCollapsed == true)
            return;
          
          var selectedText ="";
          for(i=0;i<selection.rangeCount;i++)
            selectedText+=selection.getRangeAt(i).cloneContents().textContent+" ";
          
          console.log('Selection complete');
          console.log('Selected Text : '+selectedText);
  
          SL.addSearchQuery(selectedText);
          SL.setDisplay(SL.btnGrpDisplayType.BLOCK);
          SL.setPosition(selection.getRangeAt(0).getBoundingClientRect());
                    
        }
      })
    }

  };


})();





