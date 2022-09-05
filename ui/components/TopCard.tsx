import { Card, CardContent, Grow } from "@mui/material";

const TopCard = (props: any) => {
  return (
    <div>
      <Grow in={true} timeout={1000}>
        <Card>
          <CardContent>
            <div className="d-flex" style={{ padding: "5px 5px" }}>
              <div className={`lg-box d-inline-block ${props.bg}`}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: props.color,
                    textAlign: "center",
                    fontSize: "1.2rem",
                    color: "#fff",
                    paddingTop: "15px",
                    opacity: 0.75,
                  }}
                >
                  {props.acronym}
                </div>
              </div>
              <div className="ms-3">
                <h3 className="mb-0 font-weight-bold">{props.earning}</h3>
                <small className="text-muted">{props.subtitle}</small>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grow>
    </div>
  );
};

export default TopCard;
