import React, {Component} from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {hours: 0, minutes: 0, seconds: 0};
    }

    tick() {
        const date = new Date();
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours();

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
            <div className="clock">
                <Hand name="hours" deg={this.state.hours}/>
                <Hand name="minutes" deg={this.state.minutes}/>
                <Hand name="seconds" deg={this.state.seconds}/>
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

export default Clock;
