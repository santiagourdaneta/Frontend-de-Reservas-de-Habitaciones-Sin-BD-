<template>
  <main class="container">
    <h1>Reserva tu habitación</h1>
    <form @submit.prevent="submitForm">

       <label for="habitacion">
        Selecciona una habitación
        <select id="habitacion" v-model="form.habitacionId" required>
          <option value="" disabled>-- Elige una habitación --</option>
          <option v-for="habitacion in habitaciones" :key="habitacion.id" :value="habitacion.id">
            {{ habitacion.nombre }}
          </option>
        </select>
      </label>

      <article v-if="habitacionSeleccionada">
        <header>
          <h2>{{ habitacionSeleccionada.nombre }}</h2>
        </header>
        <p>{{ habitacionSeleccionada.descripcion }}</p>
        <footer>
          <p>Precio por noche: <strong>${{ habitacionSeleccionada.precioPorNoche }}</strong></p>
        </footer>
      </article>
      
      <div class="grid">
       
       <label for="nombre">
          Nombre
          <input type="text" id="nombre" v-model="form.nombre" required :maxlength="50">
        </label>
        
        <label for="apellido">
          Apellido
          <input type="text" id="apellido" v-model="form.apellido" required :maxlength="50">
        </label>
      </div>

      <label for="email">
        Email
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          required 
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          :maxlength="50"
        >
      </label>

      <label for="celular">
        Celular
        <input 
          type="tel" 
          id="celular" 
          v-model="form.celular" 
          required 
          :maxlength="15" 
          pattern="[0-9]{9,15}"
        >
      </label>

      <label for="fecha_entrada">
        Fecha de entrada
        <flat-pickr
          id="fecha_entrada"
          v-model="form.fecha_entrada"
          :config="flatpickrConfig"
          required
        ></flat-pickr>
      </label>

       <label for="fecha_salida">
        Fecha de salida
        <flat-pickr
          id="fecha_salida"
          v-model="form.fecha_salida"
          :config="flatpickrConfig"
          required
        ></flat-pickr>
      </label>

      <button type="submit" class="contrast">Reservar ahora</button>
    </form>
  </main>
</template>

<script setup>

import { ref, computed } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { habitaciones } from '../data/habitaciones.js';

const form = ref({
  nombre: '',
  apellido: '',
  email: '',
  celular: '',
  fecha_entrada: null,
  fecha_salida: null,
  habitacionId: '' 
});

const flatpickrConfig = {
  dateFormat: 'Y-m-d',
  minDate: 'today'
};

// Usamos una propiedad computada para encontrar la habitación seleccionada
const habitacionSeleccionada = computed(() => {
  return habitaciones.find(h => h.id === form.value.habitacionId);
});


    const submitForm = async () => {
      if (!habitacionSeleccionada.value) {
        alert('Por favor, selecciona una habitación.');
        return;
      }
    
      // 1. Envía los datos al servidor (nuestra nueva API)
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form.value, habitacion: habitacionSeleccionada.value })
      });
    
      const result = await response.json();
    
      // 2. Muestra la respuesta del servidor
      if (result.success) {
        alert(result.message);
        console.log('Respuesta del servidor:', result.data);
      } else {
        alert('Error: ' + result.message);
      }
    };
</script>