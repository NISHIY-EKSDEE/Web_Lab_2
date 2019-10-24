<%@ page import="model.Point" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Collections" %><%--
  Created by IntelliJ IDEA.
  User: nishiy
  Date: 15.10.2019
  Time: 22:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% System.out.println("entered index.jsp");%>
<html>
<head>
  <jsp:useBean id="history" class="bean.History" scope="session" />
  <link rel="stylesheet" type="text/css" href="resources/mainStyles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Основная страница</title>
</head>
<body>
<table>
  <tr>
    <td colspan="2">
    </td>
    <td border="1" class="cellsWithBorders">
      <header>Выполнил: Астраханцев Вячеслав<br>
        Группа: P3214<br>
        Вариант: 214570
      </header>
    </td>
  </tr>
  <form action="controller" method="get" id="myForm">
    <tr>
      <td><p class="changeCoordinate">Изменение X:</p></td>
      <td class="input">
        <table class="miniTable">
          <tr>
            <td><input type="checkbox" class="X" name="X" value="-3"><label>-3</label></td>
            <td><input type="checkbox" class="X" name="X" value="-2"><label>-2</label></td>
            <td><input type="checkbox" class="X" name="X" value="-1"><label>-1</label></td>
            <td><input type="checkbox" class="X" name="X" value="0"><label>0</label></td>
            <td><input type="checkbox" class="X" name="X" value="1"><label>1</label></td>
            <td><input type="checkbox" class="X" name="X" value="2"><label>2</label></td>
            <td><input type="checkbox" class="X" name="X" value="3"><label>3</label></td>
            <td><input type="checkbox" class="X" name="X" value="4"><label>4</label></td>
            <td><input type="checkbox" class="X"  name="X" value="5"><label>5</label></td>
          </tr>
          <tr>
            <td id="wrongX" colspan="9">

            </td>
          </tr>
        </table>
      </td>
      <td rowspan="3" align="middle" class="cellsWithBorders">
        <table>
          <tr>
            <td align="middle">
              <canvas width="400" height="400"></canvas>
            </td>
          </tr>
          <tr>
            <td id="tdUnderMap" height="27px" align="middle">

            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td><p class="changeCoordinate">Изменение Y:</p></td>
      <td class="input" id="inputY">
        <table align="top">
          <tr>
            <td>
              <input type="text" name="Y" id="YTextField" oninput="checkY()" size="20" pattern="((0|-?[1-4])(\.[0-9]*[1-9]+)?)|(5|-5)" placeholder="от -5 до 5" maxlength="50" required>
            </td>
          </tr>
          <tr>
            <td id="wrongY">

            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td><p class="changeCoordinate">Изменение R:</p></td>
      <td class="input">
        <table>
          <tr>
            <td><input type="checkbox" class="R" name="R" value="1"><label>1</label></td>
            <td><input type="checkbox" class="R" name="R" value="2"><label>2</label></td>
            <td><input type="checkbox" class="R" name="R" value="3"><label>3</label></td>
            <td><input type="checkbox" class="R" name="R" value="4"><label>4</label></td>
            <td><input type="checkbox" class="R" name="R" value="5"><label>5</label></td>
          </tr>
          <tr>
            <td id="wrongR" colspan="5"></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div align="right"><button type="button" id="trashBtn" name="trash" value="0"><i class="fa fa-trash"></i></button></div>
      </td>
      <td>
        <!-- <input type="hidden" id="timezone_offset" name="timezone_offset" value=""> -->
        <button id="checkBtn" disabled="true">Проверить попадание</button>
      </td>
    </tr>
  </form>
  <form action="controller" method="get" id="hiddenForm">
    <input type="hidden" id="hiddenX" name="X" value="">
    <input type="hidden" id="hiddenY" name="Y" value="">
    <input type="hidden" id="hiddenR" name="R" value="">
  </form>
</table>
<table id="historyTable">
  <%
    List<Point> list = history.getResults();
    if(list.size() > 0)%>
  <tr id="tableHeaders"><th>Координата X</th><th>Координата Y</th><th>Радиус R</th><th>Результат</th></tr>
    <%Collections.reverse(list);
    for(Point p : list){%>
  <tr><td class="historyX"><%=p.getX()%></td>
    <td class="historyY"><%=p.getY()%></td>
    <td class="historyR"><%=p.getR()%></td>
    <td class="historyResults"><%=p.getResult()%></td></tr>
   <% }
  %>
</table>
<script type="text/javascript" src="resources/script.js"></script>
</body>
</html>