import React from 'react';
import { Marker } from 'react-leaflet';
import { useSpring, animated } from 'react-spring';
import L from 'leaflet';

// We need to create an animated version of the Leaflet Marker component
const AnimatedMarker = ({ position, icon }) => {
    // useSpring hook will animate the values when they change
    const [animatedProps, api] = useSpring(() => ({
        coords: [position.lat, position.lng],
        config: { duration: 1000 } // Animation duration of 1 second
    }));

    // When the position prop changes, start the animation
    React.useEffect(() => {
        api.start({ coords: [position.lat, position.lng] });
    }, [position, api]);
    
    // We need to extend the Leaflet Marker to accept animated values
    const AnimatedLeafletMarker = animated(Marker);

    return (
        <AnimatedLeafletMarker
            position={animatedProps.coords}
            icon={icon}
        />
    );
};

export default AnimatedMarker;