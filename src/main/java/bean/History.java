package bean;

import model.Point;
import java.io.Serializable;
import java.util.ArrayList;

//@Stateful(mappedName = "history")
//@StatefulTimeout(unit = TimeUnit.MINUTES, value = 30)
public class History implements Serializable {
    private ArrayList<Point> results;


    public History() {
        results = new ArrayList<Point>();
    }

    public ArrayList<Point> getResults() {
        return results;
    }

    public void setResults(ArrayList<Point> results) {
        this.results = results;
    }

    public void addPoint(Point p){
        results.add(p);
    }
}