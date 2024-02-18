import {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapComponentsProvider,
    YMapMarker,
    YMapControls,
    YMapZoomControl
} from "ymap3-components";


export default function Map({ coordinates }: { coordinates: string[] }) {

    const apiKey = "07ec2107-32d1-43a6-b51a-5609ee4bf6a7";
    const center = { center: [60.409709, 53.565199], zoom: 3 };

    const formatCoordinate = (coordinate: string) => {
        return coordinate.replace(',', '.');
    };
    const locations = coordinates.map(coordString => {
        const [longitude, latitude] = coordString.split(', ').map(formatCoordinate);
        return { coordinates: [Number(longitude), Number(latitude)] };
    });

    return (
        <YMapComponentsProvider apiKey={apiKey}>
            <YMap
            location={center}
            behaviors={["drag"]}
            mode="vector"
            theme="dark"
            >
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                {locations.map((location, index) => (
                    <YMapMarker key={index} coordinates={location.coordinates}>
                        <svg
                        width="62"
                        height="62"
                        viewBox="0 0 62 62"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle opacity="0.3" cx="31" cy="31" r="31" fill="#E7ED52" />
                        <circle opacity="0.6" cx="31" cy="31" r="23" fill="#E7ED52" />
                        <circle cx="31" cy="31" r="14" fill="#E7ED52" />
                        </svg>
                    </YMapMarker>
                ))}
                <YMapControls position="right">
                    <YMapZoomControl />
                </YMapControls>
            </YMap>
        </YMapComponentsProvider>
    );
}
