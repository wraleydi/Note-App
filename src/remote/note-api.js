const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const getNotesApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/notes`);
        return await response.json();
    } catch (error) {
        responseMessage('gagal memuat, coba cek internet');
    }
};

const createNoteApi = async (note) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        };
    
        const response = await fetch(`${BASE_URL}/notes`, options);
        
        if(!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch(error) {
        responseMessage('gagal memuat, cek internet anda');
    }
};

const deleteNoteApi = async (note_id) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`${BASE_URL}/notes/${note_id}`, options);
        return await response.json();
    } catch(error) {
        responseMessage('gagal memuat, cek internet anda');
    }
};

const responseMessage = (message = 'cek internet Anda') => {
    alert(message);
};

export {
    getNotesApi,
    createNoteApi,
    deleteNoteApi,
    responseMessage
}