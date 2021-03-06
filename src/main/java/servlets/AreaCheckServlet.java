package servlets;

import bean.History;
import model.Point;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Point point = getPointFromRequest(req);
            HttpSession session = req.getSession();
            History bean = (History) session.getAttribute("history");
            bean.addPoint(point);
            req.setAttribute("point", point);
            req.getRequestDispatcher("check_result.jsp").forward(req, resp  );
        }catch(NumberFormatException e) {
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Point point = getPointFromRequest(req);
            if(req.getParameter("history") != null && req.getParameter("history").equals("save")) {
                HttpSession session = req.getSession();
                History bean = (History) session.getAttribute("history");
                bean.addPoint(point);
            }
            resp.setContentType("text/json; charset=UTF-8");
            PrintWriter out = resp.getWriter();
            out.println("{\"x\": " + point.getX() + ", \"y\": " + point.getY() + ", \"r\": "
                    + point.getR() + ", \"result\": \"" + point.getResult() + "\"}");
        }catch(NumberFormatException e){
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }
    }

    private Point getPointFromRequest(HttpServletRequest req) throws NumberFormatException{
        Double x = Double.parseDouble(req.getParameter("X"));
        Double y = Double.parseDouble(req.getParameter("Y"));
        Double r = Double.parseDouble(req.getParameter("R"));
        boolean result = ((x <= 0 && x >= -r && y >= 0 && y <= r)
                || (x <= 0 && x >= -r && y <= 0 && y >= -r && (x*x + y*y <= r*r))
                || (x >= 0 && x <= r/2 && y <= 0 && y >= -r && y >= 2*x - r));
        return new Point(x, y, r, result);
    }
}
