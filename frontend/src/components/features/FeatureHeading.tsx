import {ArrowUpRight,BookOpen,ScanLine,Globe2,Images,GitCompareArrows,Leaf,ShieldCheck,NotebookPen} from 'lucide-react';
import {species} from '../../data/species';
const designs={
 species:{number:'01',section:'SNAKEPEDIA',name:'All species',image:0,icon:BookOpen,caption:'The living collection'},
 detector:{number:'02',section:'AI DETECTOR',name:'Identification studio',image:4,icon:ScanLine,caption:'See beyond the first impression'},
 compare:{number:'03',section:'SNAKEPEDIA',name:'Compare species',image:0,icon:GitCompareArrows,caption:'Small details. Different identities.'},
 gallery:{number:'04',section:'SNAKEPEDIA',name:'Image gallery',image:3,icon:Images,caption:'Nature, in full detail'},
 map:{number:'05',section:'EXPLORE',name:'Distribution map',image:2,icon:Globe2,caption:'Across the Indonesian archipelago'},
 similar:{number:'06',section:'EXPLORE',name:'Similar species',image:5,icon:GitCompareArrows,caption:'Look twice. Learn more.'},
 habitats:{number:'07',section:'EXPLORE',name:'Snake habitats',image:0,icon:Leaf,caption:'A place in the wild'},
 safety:{number:'08',section:'SAFETY GUIDE',name:'Observe responsibly',image:1,icon:ShieldCheck,caption:'Respect the wild. Keep your distance.'},
 history:{number:'09',section:'YOUR COLLECTION',name:'Observation journal',image:2,icon:NotebookPen,caption:'Every encounter has a story'},
};
export type FeatureVariant=keyof typeof designs;
export default function FeatureHeading({variant,label,title,text}:{variant:FeatureVariant;label:string;title:string;text?:string}){
 const d=designs[variant];const Icon=d.icon;const s=species[d.image];
 return <><div className="page-trail"><a href="#home">Home</a><span>/</span><span>{d.section}</span><span className="trail-edition">SERPENTA FIELD GUIDE <span> / </span> VOL. 01</span></div><div className={'feature-masthead masthead-'+variant}><div className="masthead-copy"><div className="masthead-kicker"><span className="masthead-icon"><Icon size={17} strokeWidth={1.5}/></span><span>{d.name}</span><span className="masthead-number">{d.number}</span></div><span className="eyebrow">{label}</span><h1>{title}</h1>{text&&<p>{text}</p>}<div className="masthead-rule"><span/><span>OBSERVE · UNDERSTAND · COEXIST</span></div></div><figure className="masthead-art"><img src={s.image} alt={s.english}/><div className="art-contours" aria-hidden="true"><span/><span/><span/></div>{variant==='detector'&&<div className="art-viewfinder" aria-hidden="true"><i/><i/><i/><i/></div>}{variant==='compare'&&<div className="art-split"><img src={species[4].image} alt={species[4].english}/></div>}<span className="art-index">S / {d.number}</span><figcaption><span>{d.caption}</span><a href={s.source} target="_blank" rel="noreferrer">{s.scientific}<ArrowUpRight size={12}/></a></figcaption><span className="art-side-note">SERPENTA — VISUAL ARCHIVE</span></figure></div></>;
}
