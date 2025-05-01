// utils/vehicleUtils.js

export const obtenerEstadoVehiculo = (unit) => {
   const mantenimiento = necesitaMantenimiento(unit);
   const consumo = necesitaRevisionConsumo(unit);
   const velocidad = necesitaRevisionVelocidad(unit);
   const operacion = necesitaRevisionOperacional(unit);
   const motor = necesitaRevisiónMotor(unit);

   return {
      mantenimiento,
      consumo,
      velocidad,
      operacion,
      motor,
   };
};

const necesitaMantenimiento = (unit) => {
   const km = unit.mileage / 1000; // metros a km
   const horasEncendido = unit.ignition_total_time / 3600; // segundos a horas
   const sinActualizar = Date.now() - new Date(unit.last_update).getTime();
   const diasSinActualizar = sinActualizar / (1000 * 60 * 60 * 24); // milisegundos a días

   if (km > 100_000) {
      return { estado: "⚠️", mensaje: "Mantenimiento necesario" };
   }
   if (horasEncendido > 10_000) {
      return { estado: "⚠️", mensaje: "Revisión por uso prolongado" };
   }
   if (diasSinActualizar > 7) {
      return { estado: "⚠️", mensaje: "Sin datos hace más de 7 días" };
   }

   return { estado: "✅", mensaje: "En buen estado" };
};

const necesitaRevisionConsumo = (unit) => {
   const consumoPromedio = unit.avg_fuel_consumption?.norm;
   const consumoAlto = 15; // Límite de consumo de combustible

   if (consumoPromedio && consumoPromedio > consumoAlto) {
      return { estado: "⚠️", mensaje: "Requiere revisión de combustible" };
   }

   return { estado: "✅", mensaje: "Consumo dentro de lo esperado" };
};

const necesitaRevisionVelocidad = (unit) => {
   const velocidadPromedio = unit.avg_speed;
   const velocidadLimite = 100; // Límite de velocidad recomendado

   if (velocidadPromedio && velocidadPromedio > velocidadLimite) {
      return { estado: "⚠️", mensaje: "Reducir velocidad recomendada" };
   }

   return { estado: "✅", mensaje: "Velocidad adecuada" };
};

const necesitaRevisionOperacional = (unit) => {
   const tiempoEncendido = unit.ignition_total_time / 3600; // horas
   const limiteTiempoEncendido = 10; // horas sin carga

   if (tiempoEncendido > limiteTiempoEncendido) {
      return { estado: "⚠️", mensaje: "Revisión operativa necesaria" };
   }

   return { estado: "✅", mensaje: "Operación eficiente" };
};

const necesitaRevisiónMotor = (unit) => {
   const horasMotorEncendido = unit.ignition_total_time / 3600;
   const tiempoLimite = 12; // horas

   if (horasMotorEncendido > tiempoLimite) {
      return { estado: "⚠️", mensaje: "Apagar motor para evitar desgaste" };
   }

   return { estado: "✅", mensaje: "Motor en buen estado" };
};
