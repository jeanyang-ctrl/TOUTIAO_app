<template>
   <!-- 焦点图模块 -->
    <div class="focus">
        <ul>
            <li><img src="@\assets\img\home\focus3.jpg" alt=""></li>
            <li><img src="@\assets\img\home\focus1.jpg" alt=""></li>
            <li><img src="@\assets\img\home\focus2.jpg" alt=""></li>
            <li><img src="@\assets\img\home\focus3.jpg" alt=""></li>
            <li><img src="@\assets\img\home\focus1.jpg" alt=""></li>
        </ul>
        <!-- 小圆点 -->
        <ol>
            <li class="current"></li>
            <li></li>
            <li></li>
        </ol>
    </div>
</template>

<script>
import "./index"
export default {
  
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.focus {
    position: relative;
    /* padding-top: 44px; */
    overflow: hidden;
}

.focus img {
    width: 100%;
}

.focus ul {
    overflow: hidden;
    width: 500%;
    margin-left: -100%;
}

.focus ul li {
    float: left;
    width: 20%;
}

.focus ol {
    position: absolute;
    bottom: 5px;
    right: 5px;
    margin: 0;
}

.focus ol li {
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #fff;
    list-style: none;
    border-radius: 2px;
    transition: all .3s;
}

.focus ol li.current {
    width: 15px;
    background-color:pink;
}


</style>