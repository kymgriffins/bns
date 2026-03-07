module.exports=[18652,a=>{"use strict";var b=a.i(89477),c=a.i(97895);function d({className:a,reverse:d=!1,pauseOnHover:e=!1,vertical:f=!1,repeat:g=4,duration:h="40s",gap:i="1rem",children:j,...k}){let l=Array(g).fill(0).map((a,c)=>(0,b.jsx)("div",{className:"flex shrink-0",style:{gap:i},children:j},c));return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - ${i})); }
        }
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - ${i})); }
        }

        .marquee {
          display: flex;
          animation: marquee ${h} linear infinite;
          animation-direction: ${d?"reverse":"normal"};
        }

        .marquee-vertical {
          display: flex;
          flex-direction: column;
          animation: marquee-vertical ${h} linear infinite;
          animation-direction: ${d?"reverse":"normal"};
        }

        .marquee-hover:hover,
        .marquee-vertical-hover:hover {
          animation-play-state: paused;
        }
      `}),(0,b.jsx)("div",{...k,className:(0,c.cn)("overflow-hidden flex",f?"flex-col":"flex-row",a),children:(0,b.jsx)("div",{className:(0,c.cn)(f?e?"marquee-vertical-hover marquee-vertical":"marquee-vertical":e?"marquee-hover marquee":"marquee"),children:l})})]})}a.s(["Marquee",()=>d])}];