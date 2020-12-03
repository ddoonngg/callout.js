export default function addEventListener(window: Window, type:string, callback:any) { 
	window.addEventListener(type, callback);
	return {
		remove: () => {
			window.removeEventListener(type, callback);
		}
	}
}