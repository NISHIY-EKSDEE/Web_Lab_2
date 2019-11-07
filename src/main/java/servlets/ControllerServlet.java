package servlets;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Double x = Double.parseDouble(req.getParameter("X"));
            Double y = Double.parseDouble(req.getParameter("Y"));
            Double r = Double.parseDouble(req.getParameter("R"));
            req.getRequestDispatcher("areaCheck").forward(req, resp);
        }
        catch(Exception e) {
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(req.getParameter("type") != null
                && req.getParameter("type").equals("check-point"))
            req.getRequestDispatcher("areaCheck").forward(req, resp);
        else req.getRequestDispatcher("index.jsp").forward(req, resp);
    }
}
