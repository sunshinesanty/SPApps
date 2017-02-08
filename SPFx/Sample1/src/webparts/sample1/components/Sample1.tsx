import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../Sample1.module.scss';
import { ISample1WebPartProps } from '../ISample1WebPartProps';

export interface ISample1Props extends ISample1WebPartProps {
}

export default class Sample1 extends React.Component<ISample1Props, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.sample1}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row)}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>
                Welcome to SharePoint!
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.description}
              </p>
              <a
                className={css('ms-Button', styles.button)}
                href='https://github.com/SharePoint/sp-dev-docs/wiki'
              >
                <span className='ms-Button-label'>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
