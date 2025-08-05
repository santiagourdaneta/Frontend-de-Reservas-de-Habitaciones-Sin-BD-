import { defineEventHandler, readBody, getRequestIP } from 'h3';

// Guardaremos las solicitudes de los usuarios aquí (un ejemplo simple)
const requestCount = new Map();

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event);
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;

  // Filtramos las solicitudes que son más viejas que un minuto
  const requests = (requestCount.get(ip) || []).filter(timestamp => timestamp > oneMinuteAgo);
  requests.push(now);
  requestCount.set(ip, requests);

  // Si hay más de 5 solicitudes en un minuto, bloqueamos
  if (requests.length > 5) {
    return { success: false, message: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' };
  }

  // 1. Validar el origen (CSRF)
  const referer = event.req.headers.referer;
  if (!referer || !referer.includes('localhost:3000')) { // Cambia esto por tu dominio real
    return { success: false, message: 'Solicitud no autorizada. Origen no válido.' };
  }

  // 2. Leer los datos enviados desde el formulario (frontend)
  const body = await readBody(event);

  // 3. Validaciones en el servidor
  // La verdadera seguridad: si el usuario intenta saltarse la validación del navegador
  if (!body.nombre || body.nombre.length < 3 || body.nombre.length > 50) {
    return { success: false, message: 'El nombre no es válido.' };
  }

   if (!body.apellido || body.apellido.length < 3 || body.apellido.length > 50) {
    return { success: false, message: 'El apellido no es válido.' };
  }

  if (!body.email || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(body.email)) {
    return { success: false, message: 'El email no es válido.' };
  }

   if (!body.celular || !/^[0-9]{9,15}/.test(body.celular)) {
    return { success: false, message: 'El celular no es válido.' };
  }

   if (!body.fecha_entrada) {
    return { success: false, message: 'La fecha de entrada es obligatoria.' };
  }

  if (!body.fecha_salida) {
    return { success: false, message: 'La fecha de salida es obligatoria.' };
  }

  // Validación de fechas
  const fechaEntrada = new Date(body.fecha_entrada);
  const fechaSalida = new Date(body.fecha_salida);

  if (fechaEntrada >= fechaSalida) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La fecha de salida debe ser posterior a la fecha de entrada.',
    });
  }

// 4. Procesar la reserva (aquí iría la lógica para guardar en la base de datos)
  // Por ahora, solo simularemos que se ha guardado
  console.log('Reserva recibida y validada en el servidor:', body);



  // 5. Devolver una respuesta
   return {
    success: true,
    message: '¡Reserva recibida con éxito!',
    data: body
  };});

 