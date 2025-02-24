interface stackEL {
  type:number
  title:string
}
interface genHonoiTower<T>{
    items: T [];
   stackId:number;
   push(item:T):void;
   pop(): T | undefined ;
   peek(): T | undefined;
  isEmpty():boolean;
  size():number;
  clear():void;
  getID():string;
  genElement(elem:stackEL):Element;
  render(container:Element|null):void;

}
interface  game{
  init(StackA:HonoiTower, StackB:HonoiTower, StackC:HonoiTower, container:Element):void
  rerender(elem:HonoiTower):void;
  steps(Stack_1:HonoiTower,Stack_2:HonoiTower):void;
  resolve():void;
} 
class HonoiTower implements genHonoiTower<stackEL> {
   items: stackEL [];
  stackId: number;
 
  constructor(id:number) {
    this.stackId=id;
    this.items = [];
    }
  getID(): string {
    return "stack_"+this.stackId;
  }
    push(item:stackEL |undefined):void{
     if (item) {
      this.items.push(item);
     }
    }
    pop(): stackEL | undefined {
    return this.items.pop();
    }
    peek(): stackEL | undefined {
    return this.items[this.items.length-1];
   }
   isEmpty():boolean{
    return this.items.length === 0;
   }
   size():number{
    return this.items.length;
   }
   clear():void {
    this.items = [];
   }
   genElement(elem:stackEL):Element{
     const newDisk =  document.createElement("li");
     if (elem.type == 3) {
      newDisk.classList.add("first");
    }
     if (elem.type ==2) {
            newDisk.classList.add("second");
      } 
      if (elem.type == 1) {
        newDisk.classList.add("last");
    } 
    newDisk.innerText=elem.title;
      return newDisk;
   }
    render(container:Element|null):void {
      const newStack= document.createElement("ul");
      newStack.setAttribute("id",this.getID())
      newStack.classList.add("stack");
      if (!this.isEmpty()) {
        for (let index = this.size()-1; index >=0; index--) {
          const element = this.items[index];
          console.log(element);
          newStack.append(this.genElement(element))  
        }
    
        } if (container!=null) {
      return container.append(newStack);
    }
  }
}

class Game   implements game{
  private container:Element|null;
  private StackA: HonoiTower;
  private StackB: HonoiTower;
  private StackC: HonoiTower;
  private diskCount:number|null;
  constructor( StackA: HonoiTower, StackB: HonoiTower, StackC: HonoiTower, container: Element|null, diskCount:conter) {
    this.StackA = StackA
    this.StackB = StackB
    this.StackC = StackC
    this.container = container;
    this.diskCount = diskCount;
  }
  rerender(elem: HonoiTower): void {    
    const stack = document.getElementById(elem.getID());

    if (stack) {
      
      stack.innerHTML = ""
      elem.items.forEach((el)=>{  stack.prepend(elem.genElement(el)) }); 
    }
    else{
      alert("not faind stack! ")
    }
  }
  stepscounter (countDisk:number):|void{
    console.log(countDisk*2+1);
  }
  init(): void {
    this.StackA.push({title:"1",type:1});
    this.StackA.push({title:"2",type:2});
    this.StackA.push({title: "3",type:3});
    if (container!=null) {
      this.StackA.render(container);
      this.StackB.render(container);
      this.StackC.render(container);
          setTimeout(() => {
            alert("init done");
          }, 600);
    }
  
  }

  steps(Stack_1:HonoiTower,Stack_2:HonoiTower){
    const stepEL = Stack_1.peek();
    Stack_1.pop();
    Stack_2.push(stepEL);
    this.rerender(Stack_1);
    this.rerender(Stack_2);
  }
  resolve(){
    alert("resolve start");
    alert("step1");
    this.steps(this.StackA,this.StackB);
  setTimeout(() => {
    alert("step2");
    this.steps(this.StackA,this.StackC);
  }, 600);
  setTimeout(() => {
    alert("step3");
    this.steps(this.StackB,this.StackC);
  },600);
  setTimeout(() => {
    alert("step4");
    this.steps(this.StackA,this.StackB);
  },600); 
  setTimeout(() => {
    alert("step5");
    this.steps(this.StackC,this.StackA);
  },600);

  setTimeout(() => {
    alert("step6");
    this.steps(this.StackC,this.StackB);
  },600);
  setTimeout(() => {
    alert("step7");
    this.steps(this.StackA,this.StackB);
  },600);
}
}

const container = document.getElementById("app");

const StackA= new HonoiTower(1);
const StackB = new HonoiTower(2);
const StackC = new HonoiTower(3);
const MyGmae = new Game(StackA,StackB,StackC,container,3);
MyGmae.init();
setTimeout(() => {
  MyGmae.resolve();
}, 1200);


