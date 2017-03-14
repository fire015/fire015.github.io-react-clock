import React, {Component} from 'react';
import moment from 'moment-timezone';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {hours: 0, minutes: 0, seconds: 0, timezone: 'Europe/London'};
        this.timezones = {'Europe/London': 'London', 'America/New_York' : 'New York', 'Asia/Kabul': 'Kabul'};
    }

    handleChange(e) {
        this.setState({timezone: e.target.value});
    }

    tick() {
        const date = moment().tz(this.state.timezone);
        const seconds = date.seconds();
        const minutes = date.minutes();
        const hours = date.hours();

        this.setState(() => ({
            hours: (hours * 30) + (minutes / 2),
            minutes: (minutes * 6),
            seconds: (seconds * 6)
        }));
    }

    componentDidMount() {
        this.tick();
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <h1>Time in {this.timezones[this.state.timezone]}</h1>
                <div className="clock">
                    <Hand name="hours" deg={this.state.hours}/>
                    <Hand name="minutes" deg={this.state.minutes}/>
                    <Hand name="seconds" deg={this.state.seconds}/>
                </div>
                <Timezones items={this.timezones} handleChange={this.handleChange}/>
            </div>
        );
    }
}

function Hand(props) {
    return (
        <div className={props.name + '-container'}>
            <div className={props.name} style={{transform: 'rotateZ(' + props.deg + 'deg)'}}></div>
        </div>
    );
}

function Timezones(props) {
    return (
        <form className="form-inline">
            <div className="form-group">
                <label>Change timezone:</label>
                <select className="form-control" onChange={props.handleChange}>
                    {Object.keys(props.items).map(key => (
                        <option key={key} value={key}>{props.items[key]}</option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default Clock;
