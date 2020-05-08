package virtusa.vride.model;

import java.sql.Time;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
public class Pooling {
    
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long poolingId;
	
	@ManyToOne
	private Location startLocation;
	
	@Temporal(TemporalType.DATE)
	private Date startDate;
	
	
	private Time startTime;
	
	@NotNull
	private Float costPerHead;
	
	@ManyToOne
	private VirtusaBranch destinationLocation;
	
	@ManyToOne
	private Employee employee;
	
	@ManyToOne
	private Car car;
	
	@NotNull
	private Integer availableSeats;

	public Long getPoolingId() {
		return poolingId;
	}

	public void setPoolingId(Long poolingId) {
		this.poolingId = poolingId;
	}

	public Location getStartLocation() {
		return startLocation;
	}

	public void setStartLocation(Location startLocation) {
		this.startLocation = startLocation;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Time getStartTime() {
		return startTime;
	}

	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

	public Float getCostPerHead() {
		return costPerHead;
	}

	public void setCostPerHead(Float costPerHead) {
		this.costPerHead = costPerHead;
	}

	public VirtusaBranch getDestinationLocation() {
		return destinationLocation;
	}

	public void setDestinationLocation(VirtusaBranch destinationLocation) {
		this.destinationLocation = destinationLocation;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Car getCar() {
		return car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	public Integer getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(Integer availableSeats) {
		this.availableSeats = availableSeats;
	}
	
	
}
