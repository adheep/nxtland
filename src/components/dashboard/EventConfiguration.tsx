import React from "react";
import { connect } from "react-redux";
import { loadEvents,configureEvent } from "../../redux/actions/dashboard/dashboardActions";
import EventConfigForm from './EventConfigForm'
import ExhibitorConfigForm from './ExhibitorConfigForm'
type MyProps = {
  dashboard: any;
  events:any;
  loadEvents: any;
  configureEvent:any;
  initialValues:any;
};

type myState = {selectedEvent:any}



class EventConfiguration extends React.Component<MyProps, myState> {

constructor(props:any){
    super(props)
this.state = {
    selectedEvent :''
}
}
  componentDidMount() {
    this.props.loadEvents();
  }
  handleExhinitorSubmit = (values)=>{
    fetch('http://localhost:4100/createEvent',{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>{
    })
  }

  configureEvent = (eventId) =>{
      this.props.configureEvent({eventId,events:this.props.dashboard.events})
  }
  onSubmit = (values)=>{
    fetch('http://localhost:4100/createExhibitor',{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>{
    })
  }
  render() {
    return (
      <div>
        <div className="body-inner">
                           
            <div className="container" style={{paddingTop:'40px'}}>
              <div>
                <div className="row">
                  {this.props.dashboard.events.length > 0 ? (
                    this.props.dashboard.events.map((card) => {
                      return (
                        <div
                          className="col-md-3 card"
                          key={card.eventId}
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            margin: "8px",
                          }}
                        >
                          <h4>{card.name}</h4>
                          <hr />
                          <p>{card.eventId}</p><span style={{cursor:'pointer'}} onClick={()=>{this.configureEvent(card.eventId)}} ><img  src="https://img.icons8.com/ios/50/000000/settings.png" />&nbsp;Configure</span>
                        </div>
                      );
                    })
                  ) : (
                    <span />
                  )}
                </div>
                <EventConfigForm onSubmit={this.onSubmit} initialValues={this.props.initialValues}></EventConfigForm>
                {
                    this.props.dashboard.exhibitors.length > 0 ? (
                        this.props.dashboard.exhibitors.map((ex)=>{
                           return (
                               <ExhibitorConfigForm key={ex._id} onSubmit={this.onSubmit}></ExhibitorConfigForm>
                           )
                        })
                    ): (<span/>) 
                }
              </div>
            </div>
         
                    
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dashboard: state.dashboard,
  initialValues : state.dashboard.initialValues
});

export default connect(mapStateToProps, { loadEvents,configureEvent })(EventConfiguration);
