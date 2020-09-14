export const getPosition = (options?:PositionOptions) : Promise<Position> => {
    return new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    })
}
