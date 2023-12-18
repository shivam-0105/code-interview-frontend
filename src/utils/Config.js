let URL = '';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://code-interview-backend-updated-mxf1y5nu0.vercel.app';
}

export { URL };