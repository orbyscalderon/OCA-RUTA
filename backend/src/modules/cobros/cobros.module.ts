import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CobrosController } from './cobros.controller';
import { CobrosService } from './cobros.service';
import { Transaccion } from '../cajas/entities/transaccion.entity';
import { Caja } from '../cajas/entities/caja.entity';
import { CuotaAmortizacion } from '../prestamos/entities/cuota-amortizacion.entity';
import { Prestamo } from '../prestamos/entities/prestamo.entity';
import { CargoMora } from '../mora/entities/cargo-mora.entity';
import { BuroCreditoModule } from '../buro-credito/buro-credito.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaccion,
      Caja,
      CuotaAmortizacion,
      Prestamo,
      CargoMora,
    ]),
    BuroCreditoModule,
  ],
  controllers: [CobrosController],
  providers: [CobrosService],
  exports: [CobrosService],
})
export class CobrosModule {}
