<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GCSG01</title>
    <style>
        body {
            font-family: "Comic Sans MS", cursive, sans-serif; /* 设置为Comic Sans MS，如果没有该字体，使用cursive，最后使用sans-serif备用字体 */
            background-color: #000000; /* 科技黑 */
            color: #ffffff; /* 文字颜色设为白色 */
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center; /* 使标题水平居中 */
            align-items: center; /* 使标题垂直居中 */
            min-height: 100vh; /* 使body至少占据整个视口高度 */
        }
        header {
            background-color: #333;
            color: #ffffff; /* 白色 */
            padding: 20px;
        }
        h1 {
            margin: 0;
            font-size: 3em; /* 将字体大小放大至原来的三倍 */
            cursor: pointer; /* 添加鼠标指针样式 */
        }
        #content {
            margin-top: 20px; /* 将内容向下偏移 */
            margin-left: 20px; /* 将内容向右偏移 */
        }
        .hidden {
            display: none; /* 初始状态下隐藏内容 */
        }
    </style>
</head>
<body>
    <header>
        <h1 onclick="toggleContent()">Hi, this is GCSG01.</h1>
    </header>
    <div id="content" class="hidden">
        <p>Welecome to GCSG01.</p>
        <p>欢迎来到GCSG01的主页</p>
    </div>

    <script>
        function toggleContent() {
            var title = document.querySelector('h1');
            var content = document.getElementById('content');

            title.style.display = 'none'; // 隐藏标题
            content.classList.remove('hidden'); // 显示内容
        }
    </script>
</body>
</html>

