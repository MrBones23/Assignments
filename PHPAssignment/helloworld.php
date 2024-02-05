<!DOCTYPE html>
<html lang="en">
    <head>
        <title>PHP Assignment</title>
        <style>
            .stickyNav li a {
                display: block;
                color: white;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
                float: left;
                
            }
            
            ul.stickyNav {
                list-style-type: none;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: #333;
                position: -webkit-sticky; /* Safari */
                position: sticky;
                top: 0;
            }
            li.stickyNav {
                float: left;
            }
            li a:hover {
                background-color: #9626ca;
            }
            
            .active {
                background-color: #eb9c35;
            }
        </style>
    </head>
    <body>
    <header>
            <ul class="stickyNav">
                <li><a class="active" href="/index.html">Home Page</a></li>
                <li><a href="/DemoHTMLPage_1.html">Demo HTML & CSS assignment</a></li>
                <li><a href="/MoreCSS/index.html">More CSS assignment</a></li>
                <li><a href="/Chapter4Assignment/chapter04.html">Chapter 04 assignment</a></li>
            </ul>
    </header>    
    <h1><?php echo "Hello World!"; ?></h1>
    </body>
</html>