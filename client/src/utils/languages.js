const languages = [
    {
      index: 0,
      key: "cpp",
      value: "cpp",
      text: "C++",
      template: `#include<iostream>
  using namespace std;
  int main() {
      cout<<"Hello World";
      return 0;
  }`,
    },
    {
      index: 0,
      key: "c",
      value: "c",
      text: "C",
      template: `#include<stdio.h>
  int main() {
      printf("Hello World");
      return 0;
  }`,
    },
    {
      index: 1,
      key: "java",
      value: "java",
      text: "JAVA",
      template: `public class Main {
      public static void main(String args[]) {
          System.out.println("Hello World!");
      }
  }`,
    },
    {
      index: 2,
      key: "py",
      value: "py",
      text: "PYTHON 3",
      template: `print("Hello World!")`,
    },
  ];
  
  export default languages;
  