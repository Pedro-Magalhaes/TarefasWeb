class Point {

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    euclidianDistance( point ) {
        return Math.abs( ( this.x - point.x ) * ( this.x - point.x ) + ( this.y - point.y  ) * ( this.y - point.y  ) );
    }

    closest ( points ) {
        let pClosest = points[0];
        let distace = points[0].euclidianDistance(this);
        points.forEach(element => {
            let newDistance = element.euclidianDistance(this);
            if(  newDistance < distance ) {
                pClosest = element;
                distance = newDistance;
            }
        });
        return pClosest;
    }
}