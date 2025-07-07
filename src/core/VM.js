export const VM = () => {
    let device = '';

    if ((window.screen.width >= 577) && (window.screen.width <= 992)) {
        device = '/devices/tablet'
    } else if (window.screen.width <= 576) {
        device = '/devices/mobile'
    }
    
    console.log(`${device===''?'Desktop':device} is the current device`);
    return device
}