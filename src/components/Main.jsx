export default function Main(props) {
    const {data } =  props

    return (
        <div className="imgContainer">
            <img src={data?.hdurl} alt="Astronomy Picture of the Day" className="bgImage" />
        </div>

    )
}