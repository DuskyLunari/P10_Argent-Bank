
export function FeatureHighlight({ image, altimg, title, text}) {
    return (
        <div className="feature-item">
            <img src={ image } alt={ altimg } className="feature-icon" />
            <h3 className="feature-item-title">{ title }</h3>
            <p>{ text }</p>
        </div>
    );
}