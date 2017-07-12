// tslint:disable:max-line-length
import * as React from 'react';
import { CompareRendererProps } from '../common/interfaces';

export const RenderString: React.StatelessComponent<CompareRendererProps> = (props: CompareRendererProps) => {
    let render: string[] = props.dataCompared.SourceString.split('');
    const substrLen = props.dataCompared.SubString.length;
    let selIdx = -1;
    const renderComp = render.map((str, idx) => {
        if (props.startIndices.findIndex(sIdx => sIdx === idx) > -1) {
            selIdx = idx;
            return (
                <span key={idx}>
                    <span className="indexDisplay" >{idx}</span>
                    <span className="indicator" />
                    <span style={{ backgroundColor: 'cyan', fontSize: '18px' }}>
                        {str}
                    </span>
                </span>
            );
        } else if (selIdx > -1 && idx >= selIdx && idx < (selIdx + substrLen)) {
            return <span key={idx} style={{ backgroundColor: 'cyan', fontSize: '18px' }}>{str}</span>;
        } else {
            return <span key={idx} style={{ fontSize: '18px' }}>{str}</span>;
        }
    });

    return (
        <figure>
            <div className="Container">
                {renderComp}
            </div>
        </figure>
    );
};