import React from "react"



export default function Form(){
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/19vcz0.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
            console.log(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        }
function handleChange(event){
    const{name,value}=event.target
    setMeme(prevMeme=>({
        ...prevMeme,
       [name]:value
    }))
}

    return(
    
<main>
<input type="text"
className="text1"
placeholder="Top text"
name="topText"
onChange={handleChange}
/>

<input type="text"
className="text2"
placeholder="Bottom text"
name="bottomText"
onChange={handleChange}
/>

<button
className="button" onClick={() => getMemeImage()}>
Get a new meme image  🖼
</button>
<div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
</main>

    )
}