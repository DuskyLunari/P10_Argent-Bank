import React from 'react';

export function FeatureHighlight({ image, altImg, title, text}) {
    return (
        <div className="feature-item">
            <img src={ image } alt={ altImg } className="feature-icon" />
            <h3 className="feature-item-title">{ title }</h3>
            <p>
                { text }
            </p>
        </div>
    );
}