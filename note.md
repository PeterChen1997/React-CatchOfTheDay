# React 学习思路

## 什么样的应用适合使用React

在经过这个任务的学习之后，了解了React框架的大致的工作原理，这让我突然想到，12月网易电面问我的一个问题

> 你在做前端项目的时候，是怎么选择框架的？

当时缺少对框架的接触，对原生的JS实现也了解不多，没有领会到面试官的意思，以为是个小方面的个人喜好问题，就匆匆回答了两句就略过了。

但是到现在才发现，这是一个涉及面很广的一个问题，涉及到面试者对当下前端工作环境的一个基本认识，也是一个考察面试者对前端多而杂的只是的整合，吸收，理解的能力。是只有对大部分框架使用的较多和有一定理解的人，才能回答出一个比较让面试官满意的答案。

React是一个组件化的框架，相对于之前接触的Vue，更加的复杂，对原生JS的理解要求更高，但是由于这个原因也让React可以拥有原生JS的部分灵活性。

由于对Vue理解不深，也没有做过一个比较成型的项目，所以暂时还无法将二者做一个比较，就拿原生JS和React来说说，什么时候选择JS，什么时候选择React

### 选择React：

- 任务较大，需要路径管理的Simple page web application，设计较多的数据流动和统一管理，例如本次所写的点餐系统，需要实时同步菜单和后台管理，当菜品售空，后台做出更改后，前面的菜单和订单也要同时的做出更新和更改，订单金额的实时变动，使用React可以通过一个统一的上级状态管理，将所有组件中的状态统一，不需要使用大量的addEventListener来做变动，通过React vitural DOM避免的冗杂低效的更新

- 缺点也比较明显，需要使用复杂的组件层层传参，CSS动画设置复杂，环境配置冗杂，需要多种工具配合开发，坑比较多

### 选择JS：

- 任务较小，需要实时变动的状态较少，组件间关联性较弱，代码逻辑较清晰，不需要大规模的重新渲染

- 缺点也比较明显，不适合复杂的应用程序，管理或者更改起来较为复杂，不满足高内聚低耦合的组件化开发思路