// src/__mocks__/intersectionObserverMock.ts

class IntersectionObserverMock implements IntersectionObserver {
 root: Element | null = null;
 rootMargin: string = "";
 thresholds: ReadonlyArray<number> = [];

 constructor(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
 ) {
  // Mock constructor logic
 }

 observe(target: Element): void {
  // Mock observe method
 }

 unobserve(target: Element): void {
  // Mock unobserve method
 }

 disconnect(): void {
  // Mock disconnect method
 }

 takeRecords(): IntersectionObserverEntry[] {
  return [];
 }
}

// Assign the mock to the global IntersectionObserver
global.IntersectionObserver = IntersectionObserverMock;

// Add this to make it a module
export {};
