<%@ page import="model.Point" %>
<%@ page import="bean.History" %><%--
  Created by IntelliJ IDEA.
  User: nishiy
  Date: 20.10.2019
  Time: 22:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% Point point = (Point) request.getAttribute("point"); %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/mainStyles.css">
    <title>Title</title>
</head>
<body>
    <table>
        <tr>
            <td>
                Ваш X:
            </td>
            <td>
                <%= point.getX() %>
            </td>
        </tr>
        <tr>
            <td>
                Ваш Y:
            </td>
            <td>
                <%= point.getY() %>
            </td>
        </tr>
        <tr>
            <td>
                Ваш R:
            </td>
            <td>
                <%= point.getR() %>
            </td>
        </tr>
        <tr>
            <td>
                Результат:
            </td>
            <td>
                <%= point.getResult() %>
            </td>
        </tr>
        <tr>
            <td>
               <form action="index.jsp">
                   <button>Назад</button>
               </form>
            </td>
        </tr>
    </table>
</body>
</html>
