interface stackEL {
  type:number
  title:string
}
interface genHonoiTower<T>{
    items: T [];
   stackId:string;
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
  resolve( diskCount:number,  StackA: HonoiTower, StackB: HonoiTower, StackC: HonoiTower):void;
} 
class HonoiTower implements genHonoiTower<stackEL> {
   items: stackEL [];
  stackId: string;
 
  constructor(id:string) {
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
    const colors= [
      '#7e7e7e',
      '#FFFF00',
      '#fb8ed7',
      '#0080FF',
      '#00FF00',
      '#7ffff0',
      '#FF8000',
      '#FF0000',
    ]
    
     const newDisk =  document.createElement("li");

     if (elem.type === 1) {
      
      let padding  =  20* elem.type; 
      newDisk.style.paddingLeft =`${padding}px`;
      newDisk.style.paddingRight =`${padding}px`;
    }
    if (elem.type > 1) {

      let padding  =  20* elem.type; 
      newDisk.style.paddingLeft =`${padding}px`;
      newDisk.style.paddingRight =`${padding}px`;
    }
   
    newDisk.style.background= colors[elem.type-1]
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
  private diskCount:number;
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
  stepscounter ():number{
   return this.diskCount*2+1;
  }
  init(): void {
      for (let index = this.diskCount; index != 0; index--) {
        this.StackA.push({title:`${index}`,type:index})
      }
    if (container!=null) {
      this.StackA.render(container);
      this.StackB.render(container);
      this.StackC.render(container);
      console.log( this.StackA);
      
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
 
  resolve(diskCount:number,  Start: HonoiTower, Goal: HonoiTower, Additinal: HonoiTower,){
  // debugger;
    if (diskCount>0) {
    this.resolve(diskCount-1 , Start, Additinal, Goal)
   setTimeout(() => {
    alert("step");
    this.steps(Start,Goal);
   }, 600);

   
    console.log(`disk ${diskCount} move from  ${Start.getID()} to ${Goal.getID()}`);
    this.resolve(diskCount-1 ,Additinal,Goal, Start)
  }
  return;
    

}
}

const container = document.getElementById("app");

const StackA= new HonoiTower("a");
const StackB = new HonoiTower("b");
const StackC = new HonoiTower("c");
const MyGmae = new Game(StackA,StackB,StackC,container,5);
MyGmae.init();
setTimeout(() => {
  MyGmae.resolve(5,StackA,StackB,StackC);

}, 1200);


