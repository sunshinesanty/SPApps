import * as React from 'react';
import { CompareRendererProps } from '../common/interfaces';

export const Equilateral: React.StatelessComponent<CompareRendererProps> = (props: CompareRendererProps) => {
    let renderString: any[] = [];
    const subStringLength = props.dataCompared.SubString.length;
    props.startIndices.forEach((startIdx: number, idx: number) => {
        renderString.push(props.dataCompared.SourceString.substring(0, startIdx-1)
        , startIdx + subStringLength));

    });
    return (
        <figure>
            <div className="triangleContainer">
                <span>{props.dataCompared.SourceString}</span>
            </div>
        </figure>
    );
};