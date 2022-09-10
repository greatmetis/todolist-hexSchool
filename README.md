# Online Todo List - OOP Learning
## Overview
This is a task to develop mini-todo list integrated with RESTful API provided by HexSchool.
It has functions of
- Registering Account
- Log in/out registered Account
- add/remove/delete/filter todos

This app is complete with classes to get familiar with Object Oriented Programming (OOP). The localStorage is used to store authentication for a day which would enhance UX.

[Live Demo](https://greatmetis.github.io/todolist-hexSchool/)


![Design Overview](/assets/preview.png)
## Table of contents

- [Online Todo List - OOP Learning](#online-todo-list---oop-learning)
  - [Overview](#overview)
  - [Table of contents](#table-of-contents)
    - [The challenge](#the-challenge)
    - [Design Spec](#design-spec)
      - [Font](#font)
      - [Color](#color)
    - [Tech Stacks](#tech-stacks)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)


### The challenge

Users should be able to:

- Login with registered account
- Fetch data from data base which is store for a day (reset at 23:59 daily)
- Filter task by status
- Delete one or multiple tasks
- Experience with RWD app

### Design Spec
[UI Design](https://hexschool.github.io/js-todo/#artboard0) 

#### Font
- font-family: NotoSansCJKtc-Regular
- font-size:
  - small:14px
  - medium: 16px
  - large: 48px

#### Color
- primary: #ffd370
- Gray: #9F9A91
- black: #333333
- white: #000
- background: linear-gradient(174deg, #FFD370 2%, #FFD370 46%, #FFFFFF 46%, #FFFFFF 100%, #E8E8E8 100%)
### Tech Stacks
- HTML/CSS/Javascript - front end languages
- [Axios](https://axios-http.com) : promise based HTTP client for browser and node.js
- [SweetAlert2](https://sweetalert2.github.io): pop up boxes for Javascript

## Author

- LinkedIn - [Chao-Chen(Metis) Teng](https://www.linkedin.com/in/chao-chen-metis-teng/)

## Acknowledgments

Big thanks to Hexschool(六角學院) which provides UI design and API sources.