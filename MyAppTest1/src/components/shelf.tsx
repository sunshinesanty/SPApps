import * as React from 'react';

class Shelf extends React.Component<any, any> {
  constructor(props:any){
    super(props);

    this.state = {
      shelfItems: [
        'shampoo',
        'chocholate',
        'yogurt'
      ]
    }

  }
  render() {
    const shelfItems = this.state.shelfItems.map((item:string, index:number)=>{
      return <li key={index}><button>[+]</button>{item}</li>
    });
    return (
      <div>
        <h2>Shelf</h2>
        <ul>
          {shelfItems}
        </ul>
      </div>
    );
  }
}

export default Shelf;
