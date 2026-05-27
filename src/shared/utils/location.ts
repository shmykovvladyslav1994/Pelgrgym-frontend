let currentPath = '/'

export const setLocation = (pathname: string) => {
    currentPath = pathname
}

export const getLocation = () => currentPath