import React from "react";

interface State {
 isInView: boolean;
}

interface IView {
 onClick: () => void;
}

class OnView extends React.Component<IView, State> {
 private elementRef: React.RefObject<HTMLDivElement>;
 private observer: IntersectionObserver | null;

 constructor(props: any) {
  super(props);
  this.state = {
   isInView: false,
  };
  this.elementRef = React.createRef<HTMLDivElement>();
  this.observer = null;
 }

 componentDidMount() {
  this.observer = new IntersectionObserver(
   ([entry]) => {
    if (entry.isIntersecting) {
     this.handleInView();
    }
   },
   { threshold: 0.5 }
  );

  if (this.elementRef.current) {
   this.observer.observe(this.elementRef.current);
  }
 }

 componentWillUnmount() {
  if (this.observer && this.elementRef.current) {
   this.observer.unobserve(this.elementRef.current);
  }
 }

 handleInView = () => {
  console.log("Element is in view!");
  this.props.onClick();
  this.setState({ isInView: true });
 };

 render() {
  return (
   <div ref={this.elementRef}>
    <button onClick={this.handleInView}></button>
   </div>
  );
 }
}

export default OnView;
